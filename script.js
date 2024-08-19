const heightInput = document.getElementById('thermometerHeight');
const widthInput = document.getElementById('thermometerWidth');
const tempRangeInput = document.getElementById('tempRange');
const scalePreview = document.getElementById('scalePreview');
const downloadBtn = document.getElementById('downloadBtn');

function generateScale() {
    const height = parseFloat(heightInput.value);
    const width = parseFloat(widthInput.value);
    const tempRange = tempRangeInput.value.split(',').map(Number);
    const [minTemp, maxTemp] = tempRange;

    const tempStep = (maxTemp - minTemp) / height; // Temperature step per mm

    let scaleSVG = `<svg width="${width}mm" height="${height}mm" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

    for (let i = 0; i <= height; i += 10) {
        const tempValue = (maxTemp - i * tempStep).toFixed(1);
        scaleSVG += `
            <line x1="0" y1="${i}" x2="${width / 2}" y2="${i}" stroke="black" stroke-width="0.5"/>
            <text x="${width / 2 + 1}" y="${i + 2}" font-size="2" fill="black">${tempValue}°</text>
        `;
    }

    scaleSVG += `</svg>`;
    scalePreview.innerHTML = scaleSVG;
}

function downloadSVG() {
    const svgContent = scalePreview.innerHTML;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thermometer_scale.svg';
    a.click();
    URL.revokeObjectURL(url);
}

heightInput.addEventListener('input', generateScale);
widthInput.addEventListener('input', generateScale);
tempRangeInput.addEventListener('input', generateScale);
downloadBtn.addEventListener('click', downloadSVG);

// Initial render
generateScale();
