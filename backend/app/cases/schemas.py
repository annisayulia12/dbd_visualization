from pydantic import BaseModel

class CaseBase(BaseModel):
    kecamatan: str
    jumlah_kasus: int
    meninggal: int
    kepadatan_penduduk: float
    desa_stbm: int
    desa_sbs: int
    curah_hujan: float
    tahun: int

class CaseCreate(CaseBase):
    pass

class Case(CaseBase):
    id: int

    class Config:
        from_attributes = True
from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    username: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

class LoginRequest(BaseModel):
    username: str
    password: str
