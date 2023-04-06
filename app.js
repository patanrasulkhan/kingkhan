const data = [
    { name: 'king', score: 100 },
    { name: 'Rasul', score: 96 },
    { name: 'mani', score: 90 },
    { name: 'ravi', score: 82 },
    { name: 'Mamarccy', score: 90 },
    { name: 'asma', score: 40 },
    { name: 'juliya', score: 55 },
  ];
  
  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(data.map(d => d.name))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.score)])
    .nice()
    .range([height - margin.bottom, margin.top]);
  
  svg.append("g")
    .attr("fill", 'green')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join("rect")
    .attr("class", "rect")
    .attr("x", d => x(d.name))
    .attr("y", d => y(d.score))
    .attr("height", d => y(0) - y(d.score))
    .attr("width", x.bandwidth())
    .on('mouseover', function() {
      d3.select(this)
        .style('opacity', 0.5)
        .style('fill', 'orange');
    })
    .on('mouseout', function() {
      d3.select(this)
        .style('opacity', 1)
        .style('fill', 'green');
    })
    .on('click', function(d) {
      alert(`Name: ${d.name}, Score: ${d.score}`);
    });
  
  svg.append("g")
    .call(d3.axisLeft(y))
    .attr("transform", `translate(${margin.left}, 0)`)
    .selectAll('text')
    .attr('font-size', '20px');
  
  svg.append("g")
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .selectAll('text')
    .attr('font-size', '20px');
  