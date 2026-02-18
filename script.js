document.addEventListener("DOMContentLoaded", () => {
    const ontologyData = {
        nodes: [
            { id: "owl:Thing", group: 1 },
            { id: "EffectsOnEnvironmentAndEconomy", group: 1 },
            { id: "EcoFriendly", group: 1 },
            { id: "ReduceWaste", group: 1 },
            { id: "SaveRessources", group: 1 },
            { id: "ReduceSize", group: 1 },
            { id: "RecycledProduct", group: 1 },
            { id: "FromGlass", group: 2 },
            { id: "GlassBottles", group: 2 },
            { id: "FromMetal", group: 2 },
            { id: "AutomobileParts", group: 2 },
            { id: "Electronics", group: 2 },
            { id: "ToolsAndHardware", group: 2 },
            { id: "FromPaper", group: 2 },
            { id: "CartonBoxes", group: 2 },
            { id: "RecycledBags", group: 2 },
            { id: "FromPlastic", group: 2 },
            { id: "PackagingMaterials", group: 2 },
            { id: "RecyclingTechnique", group: 3 },
            { id: "AvoidContamination", group: 3 },
            { id: "Bleaching", group: 3 },
            { id: "Classification", group: 3 },
            { id: "Collection", group: 3 },
            { id: "De-inking", group: 3 },
            { id: "Melting", group: 3 },
            { id: "Papermaking", group: 3 },
            { id: "Reformation", group: 3 },
            { id: "Repurpose", group: 3 },
            { id: "Reuse", group: 3 },
            { id: "Shredding", group: 3 },
            { id: "Solidification", group: 3 },
            { id: "TypeOfTrash", group: 4 },
            { id: "Glass", group: 4 },
            { id: "Metal", group: 4 },
            { id: "Paper", group: 4 },
            { id: "Plastic", group: 4 }
        ],
        links: [
            { source: "EffectsOnEnvironmentAndEconomy", target: "EcoFriendly" },
            { source: "EffectsOnEnvironmentAndEconomy", target: "ReduceWaste" },
            { source: "EffectsOnEnvironmentAndEconomy", target: "SaveRessources" },
            { source: "EffectsOnEnvironmentAndEconomy", target: "ReduceSize" },
            { source: "EcoFriendly", target: "RecycledProduct" },
            { source: "RecycledProduct", target: "FromGlass" },
            { source: "RecycledProduct", target: "FromMetal" },
            { source: "RecycledProduct", target: "FromPaper" },
            { source: "RecycledProduct", target: "FromPlastic" },
            { source: "FromGlass", target: "GlassBottles" },
            { source: "FromMetal", target: "AutomobileParts" },
            { source: "FromMetal", target: "Electronics" },
            { source: "FromMetal", target: "ToolsAndHardware" },
            { source: "FromPaper", target: "CartonBoxes" },
            { source: "FromPaper", target: "RecycledBags" },
            { source: "FromPlastic", target: "PackagingMaterials" },
            { source: "FromPlastic", target: "RecycledBags" },
            { source: "RecyclingTechnique", target: "AvoidContamination" },
            { source: "RecyclingTechnique", target: "Bleaching" },
            { source: "RecyclingTechnique", target: "Classification" },
            { source: "RecyclingTechnique", target: "Collection" },
            { source: "RecyclingTechnique", target: "De-inking" },
            { source: "RecyclingTechnique", target: "Melting" },
            { source: "RecyclingTechnique", target: "Papermaking" },
            { source: "RecyclingTechnique", target: "Reformation" },
            { source: "RecyclingTechnique", target: "Repurpose" },
            { source: "RecyclingTechnique", target: "Reuse" },
            { source: "RecyclingTechnique", target: "Shredding" },
            { source: "RecyclingTechnique", target: "Solidification" },
            { source: "TypeOfTrash", target: "Glass" },
            { source: "TypeOfTrash", target: "Metal" },
            { source: "TypeOfTrash", target: "Paper" },
            { source: "TypeOfTrash", target: "Plastic" }
        ]
    };

    const width = 800;
    const height = 600;

    const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(ontologyData.nodes)
        .force("link", d3.forceLink(ontologyData.links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(ontologyData.links)
        .enter().append("line")
        .attr("stroke-width", 2);

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(ontologyData.nodes)
        .enter().append("circle")
        .attr("r", 10)
        .attr("fill", d => d3.schemeCategory10[d.group])
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(ontologyData.nodes)
        .enter().append("text")
        .attr("dy", -3)
        .text(d => d.id);

    simulation
        .nodes(ontologyData.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(ontologyData.links);

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    // Populate ontology list
    const ontologyList = document.getElementById("ontology-list");
    ontologyData.nodes.forEach(node => {
        const li = document.createElement("li");
        li.textContent = node.id;
        ontologyList.appendChild(li);
    });

    // SPARQL query execution
    document.getElementById("run-query").addEventListener("click", () => {
        const query = document.getElementById("sparql-query").value;
        const endpoint = "https://dbpedia.org/sparql"; // Example SPARQL endpoint

        fetch(endpoint + "?query=" + encodeURIComponent(query) + "&format=json")
            .then(response => response.json())
            .then(data => {
                const results = data.results.bindings;
                const resultDiv = document.getElementById("query-results");
                resultDiv.innerHTML = "<h3>Query Results:</h3>";
                results.forEach(result => {
                    const p = document.createElement("p");
                    p.textContent = result.class.value;
                    resultDiv.appendChild(p);
                });
            })
            .catch(error => console.error("Error running query:", error));
    });
});
