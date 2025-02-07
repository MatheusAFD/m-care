export default function RegisterPage() {
  return (
    <main className="p-4">
      <section className=" flex justify-center w-full">
        <div className="w-[44rem] p-4 rounded-lg grid grid-cols-2 gap-4 bg-white">
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" placeholder="Email" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Nome fantasia:</label>
            <input id="fantasyName" type="email" placeholder="Email" />
          </div>
        </div>
      </section>
    </main>
  )
}
