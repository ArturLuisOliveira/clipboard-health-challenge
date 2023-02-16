import { deterministicPartitionKey } from "./deterministicPartitionKey";

const LARGE_STRING = "a".repeat(300);

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
        { params: { foo: LARGE_STRING, partitionKey }, expected: "" },
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
        { params: { foo: "bar", partitionKey }, expected: "" },
        { params: { foo: LARGE_STRING, partitionKey }, expected: "" },
      ];
      it("returns the partition key attribute", () => {
        tests.forEach(({ expected, params }) => {
          expect(deterministicPartitionKey(params)).toBe(expected);
        });
      });
    });

    describe("it doesn't have a partition key attribute", () => {
      const tests = [
        { params: { foo: "bar" }, expected: "" },
        { params: { foo: LARGE_STRING }, expected: "" },
      ];
      it("returns the hashed event object", () => {
        tests.forEach(({ expected, params }) => {
          expect(deterministicPartitionKey(params)).toBe(expected);
        });
      });
    });
  });
});
