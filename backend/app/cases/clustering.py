import pandas as pd
from sqlalchemy.orm import Session
from sklearn.preprocessing import MinMaxScaler
from scipy.cluster.hierarchy import linkage, fcluster
from .models import Case, Prediction, Kecamatan, Tahun


# === Koordinat Kecamatan ===
kecamatan_coords = {
    "Balen": {"lat": -7.2121, "lng": 112.0131},
    "Baureno": {"lat": -7.1975, "lng": 112.1672},
    "Bojonegoro": {"lat": -7.1502, "lng": 111.8816},
    "Bubulan": {"lat": -7.3177, "lng": 111.7020},
    "Dander": {"lat": -7.2431, "lng": 111.8585},
    "Gayam": {"lat": -7.1860, "lng": 111.7510},
    "Kalitidu": {"lat": -7.2167, "lng": 111.8167},
    "Kanor": {"lat": -7.1923, "lng": 112.0772},
    "Kapas": {"lat": -7.1994, "lng": 111.9033},
    "Kasiman": {"lat": -7.1072, "lng": 111.6111},
    "Kedewan": {"lat": -7.0667, "lng": 111.6167},
    "Kepohbaru": {"lat": -7.2167, "lng": 112.1167},
    "Malo": {"lat": -7.0833, "lng": 111.7333},
    "Margomulyo": {"lat": -7.3333, "lng": 111.5500},
    "Ngambon": {"lat": -7.3000, "lng": 111.6833},
    "Ngasem": {"lat": -7.2167, "lng": 111.7667},
    "Ngraho": {"lat": -7.2667, "lng": 111.5333},
    "Padangan": {"lat": -7.2000, "lng": 111.6000},
    "Purwosari": {"lat": -7.3500, "lng": 111.6167},
    "Sekar": {"lat": -7.3333, "lng": 111.6833},
    "Sugihwaras": {"lat": -7.2667, "lng": 111.9000},
    "Sukosewu": {"lat": -7.2167, "lng": 111.9500},
    "Sumberejo": {"lat": -7.1667, "lng": 111.9500},
    "Tambakrejo": {"lat": -7.3167, "lng": 111.7000},
    "Temayang": {"lat": -7.3167, "lng": 111.8167},
    "Trucuk": {"lat": -7.1667, "lng": 111.9333},
}


# === Ambil data untuk clustering asli ===
def get_data_for_clustering(db: Session):
    cases = db.query(Case).all()
    return pd.DataFrame([{
        "kecamatan": c.kecamatan,
        "jumlah_kasus": c.jumlah_kasus,
        "meninggal": c.meninggal,
        "kepadatan_penduduk": c.kepadatan_penduduk,
        "desa_stbm": c.desa_stbm,
        "desa_sbs": c.desa_sbs,
        "curah_hujan": c.curah_hujan,
        "tahun": c.tahun
    } for c in cases])


# === Clustering utama ===
def hierarchical_clustering(df: pd.DataFrame, n_clusters: int = 3):
    features = df[[
        "jumlah_kasus",
        "meninggal",
        "kepadatan_penduduk",
        "desa_stbm",
        "desa_sbs",
        "curah_hujan"
    ]]

    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(features)

    Z = linkage(X_scaled, method="centroid")
    labels = fcluster(Z, t=n_clusters, criterion="maxclust") - 1

    df["cluster"] = labels

    df = assign_risk_labels_by_density(df)
    df = add_coordinates(df)

    return {
        "method": "hierarchical",
        "linkage": "centroid",
        "n_clusters": n_clusters,
        "clusters": df.to_dict(orient="records")
    }


# === Label risiko ===
def assign_risk_labels_by_density(df: pd.DataFrame):
    df["jumlah_kasus"] = pd.to_numeric(df["jumlah_kasus"], errors="coerce").fillna(0)
    df["kepadatan_penduduk"] = pd.to_numeric(df["kepadatan_penduduk"], errors="coerce").fillna(0)

    df["kasus_per_penduduk"] = df.apply(
        lambda r: 0 if r["kepadatan_penduduk"] == 0 else r["jumlah_kasus"] / r["kepadatan_penduduk"],
        axis=1
    )

    means = df.groupby("cluster")["kasus_per_penduduk"].mean().sort_values()
    labels = ["Rendah", "Sedang", "Tinggi"]

    risk_map = {
        cluster_id: labels[i] if i < len(labels) else "Tidak Diketahui"
        for i, cluster_id in enumerate(means.index)
    }

    df["risk_label"] = df["cluster"].map(risk_map)
    return df


# === Tambahkan koordinat ===
def add_coordinates(df: pd.DataFrame):
    df["lat"] = df["kecamatan"].map(lambda x: kecamatan_coords.get(x, {}).get("lat"))
    df["lng"] = df["kecamatan"].map(lambda x: kecamatan_coords.get(x, {}).get("lng"))
    return df


# === Data prediksi ===
def get_data_for_prediction(db: Session, tahun_id: int):
    data = (
        db.query(
            Prediction,
            Kecamatan.nama.label("kecamatan"),
            Tahun.tahun.label("tahun")
        )
        .join(Kecamatan, Prediction.id_kecamatan == Kecamatan.id)
        .join(Tahun, Prediction.id_tahun == Tahun.id)
        .filter(Tahun.tahun == tahun_id)   # ✅ bukan id_tahun lagi
        .all()
    )


    if not data:
        return pd.DataFrame()

    return pd.DataFrame([
        {
            "kecamatan": row.kecamatan,
            "jumlah_kasus": row.Prediction.jumlah_kasus,
            "meninggal": row.Prediction.jumlah_meninggal,
            "kepadatan_penduduk": row.Prediction.kepadatan_penduduk,
            "desa_stbm": row.Prediction.desa_stbm,
            "desa_sbs": row.Prediction.desa_sbs,
            "curah_hujan": row.Prediction.curah_hujan,
            "tahun": row.tahun
        }
        for row in data
    ])
