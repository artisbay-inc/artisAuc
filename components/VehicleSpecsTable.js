/**
 * VehicleSpecsTable.js
 * Reusable table for displaying label/value vehicle specs.
 */

export default function VehicleSpecsTable({ specs }) {
  if (!specs) return null;
  const rows = Array.isArray(specs)
    ? specs
    : Object.entries(specs).map(([label, value]) => ({ label, value }));

  return (
    <table className="specs-table">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <td className="label">{row.label}</td>
            <td className="value">{row.value ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
