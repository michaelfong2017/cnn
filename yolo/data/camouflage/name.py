import glob
import os

i=1
for f in sorted(glob.glob('*.jpg')):
    # print(str(int(f[:-4])).zfill(4))
    os.rename(f, str(i).zfill(4) + '_temp.jpg')
    i=i+1

i=1
for f in sorted(glob.glob('*.jpg')):
    # print(str(int(f[:-4])).zfill(4))
    os.rename(f, str(i).zfill(4) + '.jpg')
    i=i+1