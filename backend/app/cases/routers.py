from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.db import get_db
from . import crud, schemas, clustering
import pandas as pd
from .models import Case
from .clustering import (
    get_data_for_clustering,
    get_data_for_prediction,
    hierarchical_clustering,
)
router = APIRouter(
    prefix="/cases",
    tags=["cases"]
)

@router.get("/cluster/hierarchical")
def cluster_hierarchical(n_clusters: int = 3, linkage: str = "centroid", db: Session = Depends(get_db)):
    df = get_data_for_clustering(db)
    if df.empty:
        return {"message": "No data available"}
    return hierarchical_clustering(df, n_clusters=n_clusters, linkage=linkage)


@router.get("/clustering")
def get_clustering_by_year(tahun: int, db: Session = Depends(get_db)):
    linkage = "centroid"
    df = clustering.get_data_for_clustering(db)
    df = df[df["tahun"] == tahun]
    if df.empty:
        return []
    result = clustering.hierarchical_clustering(df, n_clusters=3)
    clusters = result["clusters"]
    return [
        {
            "kecamatan": c["kecamatan"],
            "jumlah_kasus": c["jumlah_kasus"],
            "meninggal": c["meninggal"],
            "kepadatan_penduduk": c["kepadatan_penduduk"],
            "desa_stbm": c["desa_stbm"],
            "desa_sbs": c["desa_sbs"],
            "curah_hujan": c["curah_hujan"],
            "risk_label": c["risk_label"],
            "tahun": c["tahun"]
        }
        for c in clusters
    ]


@router.post("/", response_model=schemas.Case)
def create_case(case: schemas.CaseCreate, db: Session = Depends(get_db)):
    return crud.create_case(db=db, case=case)


@router.get("/", response_model=list[schemas.Case])
def read_cases(db: Session = Depends(get_db)):
    return crud.get_cases(db)



@router.get("/{case_id}", response_model=schemas.Case)
def read_case(case_id: int, db: Session = Depends(get_db)):
    db_case = crud.get_case(db, case_id=case_id)
    if db_case is None:
        raise HTTPException(status_code=404, detail="Case not found")
    return db_case


@router.put("/{case_id}", response_model=schemas.Case)
def update_case(case_id: int, case: schemas.CaseCreate, db: Session = Depends(get_db)):
    db_case = crud.update_case(db, case_id=case_id, case=case)
    if db_case is None:
        raise HTTPException(status_code=404, detail="Case not found")
    return db_case


@router.delete("/{case_id}")
def delete_case(case_id: int, db: Session = Depends(get_db)):
    db_case = crud.delete_case(db, case_id=case_id)
    if db_case is None:
        raise HTTPException(status_code=404, detail="Case not found")
    return {"message": "Case deleted successfully"}


@router.post("/upload_csv")
def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    df = pd.read_csv(file.file)

    for _, row in df.iterrows():
        db_case = Case(
            kecamatan=row["kecamatan"],
            jumlah_kasus=row["jumlah_kasus"],
            meninggal=row["meninggal"],
            kepadatan_penduduk=row["kepadatan_penduduk"],
            desa_stbm=row["desa_stbm"],
            desa_sbs=row["desa_sbs"],
            curah_hujan=row["curah_hujan"],
            tahun=row["tahun"],
        )
        db.add(db_case)
    db.commit()

    return {"message": f"{len(df)} rows inserted successfully"}


@router.get("/clustering/prediction")
def get_prediction_clustering(tahun: int, db: Session = Depends(get_db)):
    df = get_data_for_prediction(db, tahun_id=tahun)

    if df.empty:
        # frontend expects 404 → not silent
        raise HTTPException(
            status_code=404,
            detail="No prediction data for this year"
        )

    result = hierarchical_clustering(df, n_clusters=3)
    clusters = result["clusters"]

    # ✅ frontend expects { clusters: [...] }
    return {
        "clusters": [
            {
                "kecamatan": c["kecamatan"],
                "jumlah_kasus": c["jumlah_kasus"],
                "meninggal": c["meninggal"],
                "kepadatan_penduduk": c["kepadatan_penduduk"],
                "desa_stbm": c["desa_stbm"],
                "desa_sbs": c["desa_sbs"],
                "curah_hujan": c["curah_hujan"],
                "risk_label": c["risk_label"],
                "tahun": c["tahun"]
            }
            for c in clusters
        ]
    }



