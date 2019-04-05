
from database import *
import os

if os.path.isfile(DATABASE_PATH):
    os.remove(DATABASE_PATH)
load_tables()