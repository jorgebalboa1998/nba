d3.json ("https://raw.githubusercontent.com/jorgebalboa1998/nba/main/nba.json").then (function (datos){
    
    //Dimensiones del gráfico
    var height = 700
    var width = 500

    //Márgenes 
    var margin = {
        top: 60,
        botton: 40,
        left: 40,
        right: 75
    }

    //Escala eje X
    var escalaX = d3.scaleLinear()
    .domain([90, 150])
    .range([0 + margin.left, width - margin.right])

    //Escala eje Y
    var escalaY = d3.scaleLinear()
    .domain([1.95, 2.20])
    .range([height - margin.botton, 0 + margin.top])

    //Escala tamaño (en función del peso)
    var escalatamanio = d3.scaleLinear()
    .domain([90, 150])
    .range([8, 30])

    //Escala color (en función de la altura)
    var escalacolor = d3.scaleLinear()
    .domain([1.95, 2.20])
    .range(["blue", "green"])

    //SVG
    var elementoSVG = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)

    //Visualizar como círculos
    elementoSVG.selectAll("circle")
               .data(datos)
               .enter()
               .append("circle")
               .transition()
                    .duration(1000)
                    .delay(function(d, i){
                        return i * 50
                    })
               .attr("r", d => escalatamanio(d.weight))
               .attr("cx", d => escalaX(d.weight))
               .attr("cy", d => escalaY(d.height))
               .attr("fill", d => escalacolor(d.height))
    
    //Visualizar eje Y
    var ejeY = d3.axisLeft (escalaY)

    //Pintar eje Y
    elementoSVG
    .append("g")
    .attr("transform", "translate (" + margin.left + ",0)")
    .call(ejeY)
    .selectAll("text")
        .attr("transform", "rotate(-20)")

    //Añadir etiqueta al eje Y
    elementoSVG.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("x", margin.left)
    .attr("y", margin.top-10)
    .text("Altura(cm)")

    //Visualizar eje X
    var ejeX = d3.axisBottom (escalaX)

    //Pintar eje X
    elementoSVG
        .append("g")
        .attr("transform", "translate (0," + (height - margin.botton/2) + ")")
        .call(ejeX)

    //Añadir etiqueta al eje X
    elementoSVG.append("text")
    .attr("class", "label")
    .attr("text-anchor", "middle")
    .attr("x", width - margin.right/2 )
    .attr("y", height - margin.botton/3)
    .text("Peso(Kg)")

})