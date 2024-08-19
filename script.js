const overallHeightInput = document.getElementById('overallHeight');
const overallWidthInput = document.getElementById('overallWidth');
const tempRangeInput = document.getElementById('tempRange');
const tempStepInput = document.getElementById('tempStep');
const thermometerHeightInput = document.getElementById('thermometerHeight');
const thermometerWidthInput = document.getElementById('thermometerWidth');
const scalePreview = document.getElementById('scalePreview');
const downloadBtn = document.getElementById('downloadBtn');

function generateScale() {
    const overallHeight = parseFloat(overallHeightInput.value);
    const overallWidth = parseFloat(overallWidthInput.value);
    const tempRange = tempRangeInput.value.split(',').map(Number);
    const tempStep = parseFloat(tempStepInput.value);
    const [minTemp, maxTemp] = tempRange;

    const thermometerHeight = parseFloat(thermometerHeightInput.value);
    const thermometerWidth = parseFloat(thermometerWidthInput.value);

    const totalTempRange = maxTemp - minTemp;
    const tempStepPerMM = totalTempRange / overallHeight; // Degrees per mm

    const leftPadding = (overallWidth - thermometerWidth) / 2;

    let scaleSVG = `<svg width="${overallWidth}mm" height="${overallHeight}mm" viewBox="0 0 ${overallWidth} ${overallHeight}" xmlns="http://www.w3.org/2000/svg">`;

    // Mark temperatures at specified interval
    for (let temp = minTemp; temp <= maxTemp; temp += tempStep) {
        const position = (maxTemp - temp) / tempStepPerMM; // Position in mm based on temperature

        // Ensure text and line fit within the boundaries
        if (position >= 0 && position <= overallHeight) {
            scaleSVG += `
                <line x1="${leftPadding - 2}" y1="${position}" x2="${leftPadding}" y2="${position}" stroke="black" stroke-width="0.5"/>
                <text x="${leftPadding - 4}" y="${position + 2}" font-size="3" fill="black" text-anchor="end">${temp}°F</text>
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

overallHeightInput.addEventListener('input', generateScale);
overallWidthInput.addEventListener('input', generateScale);
tempRangeInput.addEventListener('input', generateScale);
tempStepInput.addEventListener('input', generateScale);
thermometerHeightInput.addEventListener('input', generateScale);
thermometerWidthInput.addEventListener('input', generateScale);
downloadBtn.addEventListener('click', downloadSVG);

// Initial render
generateScale();
