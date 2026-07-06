/** Strip protocol/path so Bedrock join addresses show as host:port, not URLs. */
export function formatServerHost(raw: string | undefined): string {
  if (!raw?.trim()) return "Not configured";

  let host = raw.trim();
  host = host.replace(/^https?:\/\//i, "");
  host = host.replace(/\/.*$/, "");
  return host || "Not configured";
}

export function formatServerAddress(
  ip: string | undefined,
  port: string | undefined = "19132",
): string {
  const host = formatServerHost(ip);
  if (host === "Not configured") return host;
  return port ? `${host}:${port}` : host;
}
