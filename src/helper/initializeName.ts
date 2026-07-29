export const initializeName = (name: string): string => {
  const nameParts = name.trim().split(/\s+/).filter(Boolean);

  if (nameParts.length === 0) {
    return "";
  }

  const firstInitial = nameParts[0].charAt(0);
  const lastInitial =
    nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
};

export default initializeName;
