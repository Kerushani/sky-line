import Table from "./table";

export default function Page() {
  return (
    <div className="flex">
        <div>Report Editor</div>
        <Table columns={4}  />
    </div>
  );
}
