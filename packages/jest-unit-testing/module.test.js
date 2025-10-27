// module.test.js
import mut from './module.js'; // MUT = Module Under Test

// Tests for Addition
test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum negatives -- success', () => {
    const expected = -6;
    const got = mut.sum(12, -18);
    expect(got).toBe(expected);
});

test('sum with zero', () => {
    expect(mut.sum(0, 5)).toBe(5);
    expect(mut.sum(5, 0)).toBe(5);
    expect(mut.sum(0, 0)).toBe(0);
  });
  
test('sum with large numbers', () => {
    const expected = 20000000000;
    const got = mut.sum(1e10, 1e10);
    expect(got).toBe(expected);
});
  
test('sum with decimals', () => {
    const got = mut.sum(0.1, 0.2);
    expect(got).toBeCloseTo(0.3, 5); 
});
  
test('sum with infinities', () => {
    expect(mut.sum(Infinity, Infinity)).toBe(Infinity);
    expect(mut.sum(-Infinity, -Infinity)).toBe(-Infinity);
    expect(mut.sum(Infinity, -Infinity)).toBeNaN(); // undefined result
});
  
test('sum with null or undefined', () => {
    expect(mut.sum(null, 5)).toBe(5);
    expect(mut.sum(5, null)).toBe(5);
    expect(mut.sum(undefined, 5)).toBeNaN();
});

// Tests for division
test('positive numbers', () => {
    const expected = 5;
    const got = mut.div(10, 2);
    expect(got).toBe(expected);
  });
  
test('positive / negative', () => {
    const expected = -5;
    const got = mut.div(10, -2);
    expect(got).toBe(expected);
});
  
test('negative / negative', () => {
    const expected = 5;
    const got = mut.div(-10, -2);
    expect(got).toBe(expected);
});
  
test('zero numerator', () => {
    const expected = 0;
    const got = mut.div(0, 5);
    expect(got).toBe(expected);
});
  
test('divide by zero (positive)', () => {
    const expected = Infinity;
    const got = mut.div(5, 0);
    expect(got).toBe(expected);
});
  
test('divide by zero (negative)', () => {
    const expected = -Infinity;
    const got = mut.div(-5, 0);
    expect(got).toBe(expected);
});
  
test('zero divided by zero', () => {
    const expected = NaN;
    const got = mut.div(0, 0);
    expect(got).toBeNaN(); 
});
  
test('decimals', () => {
    const expected = 2.5;
    const got = mut.div(5.0, 2.0);
    expect(got).toBe(expected);
});
  
test('floating precision', () => {
    const expected = 3;
    const got = mut.div(0.3, 0.1);
    expect(got).toBeCloseTo(expected, 5);
});
  
test('non-numeric input', () => {
    const expected = NaN;
    const got = mut.div("a", 2);
    expect(got).toBeNaN();
});

// tests for contains number
test('contains digits', () => {
    const expected = true;
    const got = mut.containsNumbers("abc123");
    expect(got).toBe(expected);
});
  
test('only letters', () => {
    const expected = false;
    const got = mut.containsNumbers("hello");
    expect(got).toBe(expected);
});
  
test('starts with number', () => {
    const expected = true;
    const got = mut.containsNumbers("7days");
    expect(got).toBe(expected);
});
  
test('ends with number', () => {
    const expected = true;
    const got = mut.containsNumbers("day9");
    expect(got).toBe(expected);
});
  
test('only numbers', () => {
    const expected = true;
    const got = mut.containsNumbers("98765");
    expect(got).toBe(expected);
});
  
test('empty string', () => {
    const expected = false;
    const got = mut.containsNumbers("");
    expect(got).toBe(expected);
});
  
test('special characters only', () => {
    const expected = false;
    const got = mut.containsNumbers("!@#$%");
    expect(got).toBe(expected);
});
  
test('spaces and numbers', () => {
    const expected = true;
    const got = mut.containsNumbers("hello 4 you");
    expect(got).toBe(expected);
});
  
test('single character (digit)', () => {
    const expected = true;
    const got = mut.containsNumbers("8");
    expect(got).toBe(expected);
});
  
// This test finds the error in the containsNumbers function
test("space should NOT count as a number", () => {
  const expected = false;
  const got = mut.containsNumbers(" ");
  expect(got).toBe(expected);
});