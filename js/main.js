;(function () {
    /*Logic*/
    /*All conversion functions*/
    const CelsiusToFahrenheit = degree => parseFloat((degree * 9 / 5 + 32).toFixed(2)),
        FahrenheitToCelsius = degree => parseFloat(((degree - 32) * 5 / 9).toFixed(2)),
        CelsiusToKelvin = degree => parseFloat((+degree + 273.15).toFixed(2)),
        KelvinToCelsius = degree => parseFloat((degree - 273.15).toFixed(2)),
        FahrenheitToKelvin = degree => parseFloat(CelsiusToKelvin(FahrenheitToCelsius(degree)).toFixed(2)),
        KelvinToFahrenheit = degree => parseFloat(CelsiusToFahrenheit(KelvinToCelsius(degree)).toFixed(2));

    /*
    console.log('0C ->', CelsiusToFahrenheit(0), 'F'); //0C -> 32.00 F
    console.log('20C ->', CelsiusToFahrenheit(20), 'F'); //20C -> 68.00 F
    console.log('29C ->', CelsiusToFahrenheit(29), 'F'); //29C -> 84.20 F

    console.log('32F ->', FahrenheitToCelsius(32), 'C'); //32.00 F -> 0C
    console.log('68F ->', FahrenheitToCelsius(68), 'C'); //68.00 F -> 20C
    console.log('84.2F ->', FahrenheitToCelsius(84.2), 'C'); //84.20 F -> 29C

    console.log('20C ->', CelsiusToKelvin(20), 'K'); //20C -> 293.15K
    console.log('293.15K ->', KelvinToCelsius(293.15), 'C'); //293.15K -> 20C

    console.log('68F ->', FahrenheitToKelvin(68), 'K'); //68F -> 293.15K
    console.log('293.15K ->', KelvinToFahrenheit(293.15), 'F'); //293.15K -> 68F
    */


    function parseInput(input) {
        /*Parse input string for degrees with dimensions,
        if it can be find - return values,
        in other case return error*/
        const parseResult = {error: false, parsed: null},
            pattern = /(?<degree>[\d]+)(?<dimension>[cfk])/i,
            matched = input.match(pattern);
        // console.log(matched);
        if (matched) {
            parseResult.parsed = {
                degree: matched.groups.degree,
                dimension: matched.groups.dimension.toUpperCase()
            };
        } else {
            parseResult.error = true;
        }
        return parseResult;
    }


    function convert(input) {
        /*In case of parse without errors value is converting to other dimensions
        and result is returning formatted as JSON */
        const parseResult = parseInput(input);
        if (parseResult.error) {
            return 'Wrong values entered!';
        }
        const {degree, dimension} = parseResult.parsed,
            output = {
                celsius: null,
                fahrenheit: null,
                kelvin: null
            };
        console.log('degree', degree, 'dimension', dimension);
        if (dimension === 'C') {
            output.celsius = parseFloat(degree);
            output.fahrenheit = CelsiusToFahrenheit(degree);
            console.log(output);
            output.kelvin = CelsiusToKelvin(degree);
        } else if (dimension === 'F') {
            output.celsius = FahrenheitToCelsius(degree);
            output.fahrenheit = parseFloat(degree);
            output.kelvin = FahrenheitToKelvin(degree);
        } else if (dimension === 'K') {
            output.celsius = KelvinToCelsius(degree);
            output.fahrenheit = KelvinToFahrenheit(degree);
            output.kelvin = parseFloat(degree);
        } else {
            return 'Wrong dimension!';
        }
        return JSON.stringify(output);
    }

    // console.log(convert('299K'));
    // console.log(convert('28F'));
    // console.log(convert('12611vsdfvdf'));
    // console.log(convert('99N'));

    /*Render*/

    function updatePage(convertedValues) {
        /*update elements with new converted values*/
        const {celsius, fahrenheit, kelvin} = JSON.parse(convertedValues),
            resultList = document.getElementById('result');
        // console.log('resultList', resultList, 'listItems', listItems);
        resultList.innerHTML = `
<li>Celsius: <span>${celsius}</span>C</li>
<li>Fahrenheit: <span>${fahrenheit}</span>F</li>
<li>Kelvin: <span>${kelvin}</span>K</li>
`;
        const jsonList = document.getElementById('JSON');
        jsonList.innerText = convertedValues;
    }

    const inputForm = document.getElementById('input-form');

    inputForm.addEventListener('submit', event => {
        event.preventDefault();
        const enteredString = document.getElementById('input-field').value,
            convertedValues = convert(enteredString);
        updatePage(convertedValues);

    })

})
();