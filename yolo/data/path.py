import glob
with open('train.txt', 'w') as f:
    for path in sorted(glob.glob('camouflage/*.jpg'))[:320]:
        f.write('data/' + path)
        f.write('\n')

with open('test.txt', 'w') as f:
    for path in sorted(glob.glob('camouflage/*.jpg'))[320:]:
        f.write('data/' + path)
        f.write('\n')