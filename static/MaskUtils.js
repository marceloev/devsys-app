export default {
    loadAllMasks() {
        $(".mask-Date input").mask("99/99/9999");

        var options = {
            onKeyPress: function (cpfcnpj, e, field, options) {
                console.log("3");
                var masks = ['000.000.000-000', '00.000.000/0000-00'];
                var mask = (cpfcnpj.length > 14) ? masks[1] : masks[0];
                field.mask(mask, options);
            }
        };

        $(".mask-CpfCnpj input").mask('000.000.000-000', options);
        console.log("triggerin")
        $(".mask-CpfCnpj input").keypress(undefined);
    }
}