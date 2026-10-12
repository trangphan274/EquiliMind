from pydantic import BaseModel
from typing import Optional


class ReflectionCreate(BaseModel):
    content: str
    tag: Optional[str] = None