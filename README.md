# Jenova

A game of life module that is intended to work both in a server side and client side environment.

## Usage

**Browser**:

```javascript
// TODO: Implement me :)
```

**Node**:

```javascript
// TODO: Implement me :)
```

## Implementation

This module exposes 3 functions.

1. compress - Given a board array, return a compressed value
2. expand - Given a compressed value, return a board array
3. generateNext - Given a board array, calculate the next "step", and return it in a callback function

All three functions make use of an matrix consisting of 0s and 1s.

**Example Board**:

```javascript
var myBoard = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
];
```