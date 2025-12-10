import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/employees/$employeeId/update")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/employees/$employeeId/update"!</div>
}
