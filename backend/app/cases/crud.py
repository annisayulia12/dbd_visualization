from sqlalchemy.orm import Session
from .models import Case
from . import schemas

def create_case(db: Session, case: schemas.CaseCreate):
    db_case = Case(**case.dict())
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case

def get_cases(db: Session):
    # FIX: jangan pakai models.Case
    return db.query(Case).all()

def get_case(db: Session, case_id: int):
    return db.query(Case).filter(Case.id == case_id).first()

def update_case(db: Session, case_id: int, case: schemas.CaseCreate):
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if not db_case:
        return None
    for key, value in case.dict().items():
        setattr(db_case, key, value)
    db.commit()
    db.refresh(db_case)
    return db_case

def delete_case(db: Session, case_id: int):
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if not db_case:
        return None
    db.delete(db_case)
    db.commit()
    return db_case
