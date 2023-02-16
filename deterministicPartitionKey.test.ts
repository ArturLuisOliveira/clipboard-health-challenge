import { deterministicPartitionKey } from "./deterministicPartitionKey";

const LARGE_STRING = "abcdef".repeat(255);

describe("#deterministicPartitionKey", () => {
  describe("the event object is undefined", () => {
    const event = undefined;
    it("returns the trivial partition key", () => {
      expect(deterministicPartitionKey(event)).toBe("0");
    });
  });

  describe("the event is an object", () => {
    describe("it have a partition key attribute with a string value", () => {
      const partitionKey = "foo";
      const tests = [
        { params: { foo: "bar", partitionKey }, expected: "foo" },
        {
          params: { foo: "bar", partitionKey: LARGE_STRING },
          expected:
            "6c11714027e52911d7432950a797f80a108d17ced39d0f3fa427bff320f41e656fdbffc9e88e2611f5627db4d1618b9ed91dd90dee29a4cc0ed7ea0cb80e0ad6",
        },
      ];
      it("returns the partition key attribute", () => {
        tests.forEach(({ expected, params }) => {
          expect(deterministicPartitionKey(params)).toBe(expected);
        });
      });
    });

    describe("it have partition key attribute with a non-string value", () => {
      const partitionKey = 123;
      const tests = [
        { params: { foo: "bar", partitionKey }, expected: "123" },
        {
          params: { foo: "bar", partitionKey: { attribute: LARGE_STRING } },
          expected:
            "e27e0b2018b4321eebfccd2dace582f213486891c57fc3155a2fe2d9c322d11b348685eadf4a8ba0247d6e85c110808cf300adc9135dfec251b091016ca3b70e",
        },
      ];
      it("returns the partition key attribute", () => {
        tests.forEach(({ expected, params }) => {
          expect(deterministicPartitionKey(params)).toBe(expected);
        });
      });
    });

    describe("it doesn't have a partition key attribute", () => {
      const tests = [
        {
          params: { foo: "bar" },
          expected:
            "a419a15de4a65c3dba49c38b4485cd4dce1dde4d18f5b965d90f0649bef54252ec4e76dbcaa603708e8e8ebbe848ba484e81e23b7823808b5b8e5f4222d122e8",
        },
        {
          params: { foo: { LARGE_STRING } },
          expected:
            "d6525472e8073a23089c8cdd88554370d960e5b4285716085c5c53af129b4106567397b79726bf21366df8b3819f16a854d1189b246443c004116e0ce2282d4f",
        },
      ];
      it("returns the hashed event object", () => {
        tests.forEach(({ expected, params }) => {
          expect(deterministicPartitionKey(params)).toBe(expected);
        });
      });
    });
  });
});
