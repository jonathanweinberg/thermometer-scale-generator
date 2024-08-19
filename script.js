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

    const totalTempRange = maxTemp - minTemp;
    const tempStepPerMM = totalTempRange / height; // Degrees per mm

    let scaleSVG = `<svg width="${width}mm" height="${height}mm" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

    // Mark temperatures at every 10°F interval
    for (let i = 0; i <= totalTempRange; i += 10) {
        const position = i / tempStepPerMM; // Position in mm based on temperature
        const tempValue = maxTemp - i; // Fahrenheit value for this position
        if (position <= height) {
            scaleSVG += `
                <line x1="0" y1="${position}" x2="${width / 2}" y2="${position}" stroke="black" stroke-width="0.5"/>
                <text x="${width / 2 + 1}" y="${position + 2}" font-size="2" fill="black">${tempValue}°F</text>
            `;
        }
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
