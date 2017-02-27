import time

def draft(n):  # Counts up to n then back down, a generator
    while True:
        for i in xrange(1, n+1):
            yield i
        for i in xrange(n, 0, -1):
            yield i

while(True):
    for item in draft(255):
        print(item)
        # time.sleep(0.5)
# >>> d = draft(3)
# >>> [d.next() for _ in xrange(12)]
# [1, 2, 3, 3, 2, 1, 1, 2, 3, 3, 2, 1]
