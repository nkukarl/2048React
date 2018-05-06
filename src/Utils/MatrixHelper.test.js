const {merge, transpose} = require('./MatrixHelper');

describe('Merge row towards left', () => {
  it('When there are at most one non-zero value', () => {
    expect(merge([
      0, 0, 0, 0
    ], true)).toEqual([0, 0, 0, 0]);
    expect(merge([
      0, 0, 0, 2
    ], true)).toEqual([2, 0, 0, 0]);
    expect(merge([
      0, 0, 2, 0
    ], true)).toEqual([2, 0, 0, 0]);
    expect(merge([
      0, 2, 0, 0
    ], true)).toEqual([2, 0, 0, 0]);
    expect(merge([
      2, 0, 0, 0
    ], true)).toEqual([2, 0, 0, 0]);
  });
  it('When there are two or more non-zero values', () => {
    expect(merge([
      2, 2, 0, 0
    ], true)).toEqual([4, 0, 0, 0]);
    expect(merge([
      2, 2, 2, 0
    ], true)).toEqual([4, 2, 0, 0]);
    expect(merge([
      2, 2, 0, 2
    ], true)).toEqual([4, 2, 0, 0]);
    expect(merge([
      2, 0, 2, 2
    ], true)).toEqual([4, 2, 0, 0]);
    expect(merge([
      2, 2, 2, 2
    ], true)).toEqual([4, 4, 0, 0]);

    expect(merge([
      4, 4, 0, 0
    ], true)).toEqual([8, 0, 0, 0]);
    expect(merge([
      4, 4, 2, 0
    ], true)).toEqual([8, 2, 0, 0]);
    expect(merge([
      4, 4, 0, 2
    ], true)).toEqual([8, 2, 0, 0]);
    expect(merge([
      4, 4, 2, 2
    ], true)).toEqual([8, 4, 0, 0]);

    expect(merge([
      4, 2, 4, 2
    ], true)).toEqual([4, 2, 4, 2]);
    expect(merge([
      8, 0, 4, 2
    ], true)).toEqual([8, 4, 2, 0]);
  })
});

describe('Merge row towards right', () => {
  it('When there are at most one non-zero value', () => {
    expect(merge([
      0, 0, 0, 0
    ], false)).toEqual([0, 0, 0, 0]);
    expect(merge([
      0, 0, 0, 2
    ], false)).toEqual([0, 0, 0, 2]);
    expect(merge([
      0, 0, 2, 0
    ], false)).toEqual([0, 0, 0, 2]);
    expect(merge([
      0, 2, 0, 0
    ], false)).toEqual([0, 0, 0, 2]);
    expect(merge([
      2, 0, 0, 0
    ], false)).toEqual([0, 0, 0, 2]);
  });
  it('When there are two or more non-zero values', () => {
    expect(merge([
      2, 2, 0, 0
    ], false)).toEqual([0, 0, 0, 4]);
    expect(merge([
      2, 2, 2, 0
    ], false)).toEqual([0, 0, 2, 4]);
    expect(merge([
      2, 2, 0, 2
    ], false)).toEqual([0, 0, 2, 4]);
    expect(merge([
      2, 0, 2, 2
    ], false)).toEqual([0, 0, 2, 4]);
    expect(merge([
      2, 2, 2, 2
    ], false)).toEqual([0, 0, 4, 4]);

    expect(merge([
      4, 4, 0, 0
    ], false)).toEqual([0, 0, 0, 8]);
    expect(merge([
      4, 4, 2, 0
    ], false)).toEqual([0, 0, 8, 2]);
    expect(merge([
      4, 4, 0, 2
    ], false)).toEqual([0, 0, 8, 2]);
    expect(merge([
      4, 4, 2, 2
    ], false)).toEqual([0, 0, 8, 4]);

    expect(merge([
      4, 2, 4, 2
    ], false)).toEqual([4, 2, 4, 2]);
    expect(merge([
      8, 0, 4, 2
    ], false)).toEqual([0, 8, 4, 2]);
  })
});

describe('Transpose matrix', () => {
  it('When there are two rows', () => {
    expect(transpose([
      [
        0, 1
      ],
      [
        2, 3
      ]
    ])).toEqual([
      [
        0, 2
      ],
      [
        1, 3
      ]
    ]);
    expect(transpose([
      [
        0, 2
      ],
      [
        1, 3
      ]
    ])).toEqual([
      [
        0, 1
      ],
      [
        2, 3
      ]
    ]);
  });
  it('When there are three rows', () => {
    expect(transpose([
      [
        0, 1, 2
      ],
      [
        3, 4, 5
      ],
      [
        6, 7, 8
      ]
    ])).toEqual([
      [
        0, 3, 6
      ],
      [
        1, 4, 7
      ],
      [
        2, 5, 8
      ]
    ]);
    expect(transpose([
      [
        0, 3, 6
      ],
      [
        1, 4, 7
      ],
      [
        2, 5, 8
      ]
    ])).toEqual([
      [
        0, 1, 2
      ],
      [
        3, 4, 5
      ],
      [
        6, 7, 8
      ]
    ]);
  });
});
