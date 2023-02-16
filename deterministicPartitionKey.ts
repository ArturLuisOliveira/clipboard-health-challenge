import crypto from "crypto";

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

export const deterministicPartitionKey = (event: any) => {
  const candidate = findCandidate(event);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) return hash(candidate);

  return candidate;
};

const hash = (payload: any) =>
  crypto.createHash("sha3-512").update(payload).digest("hex");

const findCandidate = (event: any) => {
  if (event?.partitionKey) {
    if (typeof event.partitionKey === "string") return event.partitionKey;
    return JSON.stringify(event.partitionKey);
  }
  if (event) return hash(JSON.stringify(event));

  return TRIVIAL_PARTITION_KEY;
};
