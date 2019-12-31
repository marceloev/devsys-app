export default {
    loadAllMasks() {
        var cpfOuCnpj = ['999.999.999-99', '99.999.999/9999-99']
        $(".mask-CpfCnpj input").inputmask({ mask: cpfOuCnpj, keepStatic: true });
    }
}