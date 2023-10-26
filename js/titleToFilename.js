function fnIt(inputMD, cleanHTTPS)
{
    inputMDLines = inputMD.split("\n");
    var outputMD = "";

    for(var i = 0; i < inputMDLines.length; ++i)
    {
        var inputMDLine = inputMDLines[i];

        var match = /^(?:(#+) )?(.+)$/.exec(inputMDLine);
        if(match)
        {
            var headingLevel = match[1] && match[1].length || 0;
            var headingTitle = match[2].replace(/<.*?>/g, "");

            if(headingLevel > 1)
            {
                continue;
            }

            outputMD = headingTitle
                        .replace(/[.\/]/g, "-")
                        .replace(/[áéíóúüñÁÉÍÓÚÜÑ]/g, function (m) {
                            return {
                                "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ü": "u", "ñ": "n",
                                "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U", "Ü": "U", "Ñ": "N"
                            }[m];
                        })
                        .replace(/[^a-zA-Z0-9\-]/g, "_")
                        .replace(/[_-]+/g, "-")
                        .replace(/\-$/, "");

            if (cleanHTTPS) { outputMD = outputMD.replace(/^https?\-/, ""); }
        }
    }

    return outputMD;
}
