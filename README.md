# Etherpad Scale Calculator

Placeholder logic that will be ported to be used in a web site.

## Usage
``node scale.js a b c``

a = Max Concurrent Authors on a pad
b = Max Concurrent Lurkers on a pad
c = Max Concurrent Active Pads

## Output

With 5 concurrent editing authors, 20 lurkers each replicated over 100 pads...

```
pi@loadtest:~/scale-calculator $ node scale.js 5 20 100
Required Cores: 6
Required RAM per core: 4096
Total Authors: 500
Total Lurkers: 2000
```

## License
Apache 2
