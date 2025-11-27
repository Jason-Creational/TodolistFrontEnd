export function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

export function compareDates(date1, date2) {
    return new Date(date1).getTime() - new Date(date2).getTime();
}

export function formatISODate(iso) {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      return d.toLocaleString()
    } catch (e) { return iso }
}
