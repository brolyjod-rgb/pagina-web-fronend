
let recetas = [];

fetch('recetas.json')
.then(res => res.json())
.then(data => {
recetas = data;
mostrar(recetas);
});

const search = document.getElementById("search");

search.addEventListener("input", () => {
const q = search.value.toLowerCase();

const filtrado = recetas.filter(r =>
r.titulo.toLowerCase().includes(q) ||
r.ingredientes.some(i => i.toLowerCase().includes(q))
);

mostrar(filtrado);
});

function mostrar(lista){
const cont = document.getElementById("results");
cont.innerHTML = "";

lista.forEach(r => {
const div = document.createElement("div");
div.className = "card";

div.innerHTML = `
<h3>${r.titulo}</h3>
<p>${r.descripcion}</p>
<b>Ingredientes:</b> ${r.ingredientes.join(", ")}
`;

cont.appendChild(div);
});
}
