

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/phones", {
    method: "GET",
  });
  const data = await response.json();

  return { props: { data } }
}

export default function phones({ data }) {
  console.log(data)
  return (
    <div>
      phones
      {/* {Object.values(data.values)} */}
    </div>
  )
}

