/**
 * Counter Compact Contract Test Suite
 * Validates state transitions and private witness increments.
 */

export class CounterLocalRuntime {
  public counterValue: bigint = 0n;
  public owner: string = '';
  public isInitialized: boolean = false;

  public initialize(initialOwner: string): void {
    if (this.isInitialized) {
      throw new Error('Counter is already initialized');
    }
    this.owner = initialOwner;
    this.counterValue = 0n;
    this.isInitialized = true;
  }

  public increment(secretStep: bigint): bigint {
    if (!this.isInitialized) {
      throw new Error('Counter not initialized');
    }
    if (secretStep <= 0n) {
      throw new Error('Secret step must be positive');
    }
    this.counterValue += secretStep;
    return this.counterValue;
  }
}

function assertEqual<T>(actual: T, expected: T, testName: string): void {
  if (actual === expected) {
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    console.error(`  ✕ FAIL: ${testName} (Expected ${String(expected)}, got ${String(actual)})`);
    throw new Error(`Assertion failed: ${testName}`);
  }
}

export function runCounterTests(): void {
  console.log("==================================================================");
  console.log("⚡ COUNTER COMPACT SMART CONTRACT TEST SUITE");
  console.log("==================================================================");

  const counter = new CounterLocalRuntime();
  
  console.log('\n[Test 1: Initial State]');
  assertEqual(counter.isInitialized, false, 'Counter begins uninitialized');

  console.log('\n[Test 2: Initialization]');
  counter.initialize('0x1111111111111111111111111111111111111111111111111111111111111111');
  assertEqual(counter.isInitialized, true, 'Counter initialized');
  assertEqual(counter.counterValue, 0n, 'Initial count is 0');

  console.log('\n[Test 3: Private Witness Increment & State Transition]');
  const newCount = counter.increment(5n);
  assertEqual(newCount, 5n, 'Counter incremented by private witness step 5');
  assertEqual(counter.counterValue, 5n, 'Public ledger state updated to 5');

  console.log("==================================================================");
  console.log("✨ ALL COUNTER TEST ASSERTIONS PASSED!");
  console.log("==================================================================");
}

runCounterTests();
