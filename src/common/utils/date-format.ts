export function formatDate(date: Date | string | null): string | null {
  if (!date) return null;
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); 
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
export function formatDateForInput(date: Date | string | null): string | null {
  if (!date) return null;
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
}