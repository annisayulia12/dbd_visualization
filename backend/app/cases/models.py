from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db import Base

class Case(Base):
    __tablename__ = "kriteria"

    id = Column(Integer, primary_key=True, index=True)
    kecamatan = Column(String(100), nullable=False)
    jumlah_kasus = Column(Integer, nullable=False)
    meninggal = Column(Integer, nullable=False)
    kepadatan_penduduk = Column(Float)
    desa_stbm = Column(Integer)
    desa_sbs = Column(Integer)
    curah_hujan = Column(Float)
    tahun = Column(Integer, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False) 

class Prediction(Base):
    __tablename__ = "prediksi"

    id = Column(Integer, primary_key=True, index=True)

    id_kecamatan = Column(Integer, ForeignKey("kecamatan.id"))
    id_tahun = Column(Integer, ForeignKey("tahun.id"))

    jumlah_meninggal = Column(Integer)
    jumlah_kasus = Column(Integer)
    kepadatan_penduduk = Column(Float)
    curah_hujan = Column(Float)
    desa_sbs = Column(Integer)
    desa_stbm = Column(Integer)

    kecamatan = relationship("Kecamatan", back_populates="predictions")
    tahun = relationship("Tahun", back_populates="predictions")


class Kecamatan(Base):
    __tablename__ = "kecamatan"

    id = Column(Integer, primary_key=True, index=True)
    nama = Column(String(100), nullable=False)
    longitude = Column(Float)
    latitude = Column(Float)

    # relasi ke Prediction
    predictions = relationship("Prediction", back_populates="kecamatan")


class Tahun(Base):
    __tablename__ = "tahun"

    id = Column(Integer, primary_key=True, index=True)
    tahun = Column(Integer, nullable=False)

    predictions = relationship("Prediction", back_populates="tahun")

