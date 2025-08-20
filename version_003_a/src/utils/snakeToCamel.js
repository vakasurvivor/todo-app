// ./src/utils/snakeToCamel.js

export default function snakeToCamel(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
      value,
    ])
  );
}
