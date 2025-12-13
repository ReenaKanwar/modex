import { createShow } from "../api";

export default function Admin() {
  const submit = async (e: any) => {
    e.preventDefault();
    const f = e.target;
    await createShow({
      name: f.name.value,
      from: f.from.value,
      to: f.to.value,
      time: f.time.value,
      totalSeats: f.seats.value,
    });
    alert("Show created");
  };

  return (
    <form onSubmit={submit}>
      <input name="name" placeholder="Bus Name" />
      <input name="from" placeholder="From" />
      <input name="to" placeholder="To" />
      <input name="time" placeholder="Time" />
      <input name="seats" placeholder="Seats" />
      <button>Create</button>
    </form>
  );
}
