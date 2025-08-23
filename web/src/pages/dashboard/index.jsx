export default function dashboard() {
  return <div>dashboard: {JSON.stringify(localStorage.getItem("user"))}</div>
}
