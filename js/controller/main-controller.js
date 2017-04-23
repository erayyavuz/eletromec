app.controller('initialPageController', function($scope) {
    $scope.itens = [
        {
            title: 'Linha ELCM',
            subTitle: 'Disjuntores em Caixa Moldada',
            description: 'A linha de disjuntores em caixa moldada ELCM é um novo <br> desenvolvido com base em normas internacionais, <br> avançada e novo design.',
            imagePath: 'img/inicial/ELCM.jpg',
            pageLink: '#elcm'
        },
        {
            title: 'Linha ELMD',
            subTitle: 'Minidisjuntores',
            imagePath: 'img/inicial/ELMD.jpg',
            descriptionList: [
                'Proteção contra curto-circuito;',
                'Proteção contra sobrecarga;',
                'Função de isolamento;',
                'Suporte para instalação em trilho DIN (35mm);',
                'Indicação da posição de contato.'
            ],
            pageLink: '#elmd'
        },
        {
            title: 'Linha ELPS',
            subTitle: 'Protetores contra surto',
            imagePath: 'img/inicial/ELPS.jpg',
            descriptionList: [
                'Protege sistemas elétricos e aparelhos elétricos contra surto de tensão causado por descarga de raios e contra sobretensão instantânea;',
                'Imáx 40kA / In 20kA;',
                'Uc 275V (Tensão de operação contínua);',
                'DPS classe II.'
            ],
            pageLink: '#elps'
        },
        {
            title: 'Linha ELDR',
            subTitle: 'Interruptores diferenciais residuais',
            imagePath: 'img/inicial/ELDR.jpg',
            descriptionList: [
                'Proteção contra fulga;',
                'Tipo eletromagnético;',
                'Indicação de falha de fuga;',
                'Suporte para instalação em trilho DIN (35mm).'
            ],
            pageLink: '#eldr'
        },
        {
            title: 'Fusível Cartucho',
            imagePath: 'img/inicial/cartucho.jpg',
            descriptionList: [
                'Solução 10x38mm até 32A;',
                'Classe de atuação gL/gG.'
            ],
            pageLink: '#fusivel_cartucho'
        },
        {
            title: 'Fusível NH',
            imagePath: 'img/inicial/NH.jpg',
            descriptionList: [
                'Tensão 500Vac;',
                'Correntes de 2 a 2000A;',
                'Fabricados conforme IEC 60269;',
                'Tamanhos: 000, 00, 1, 2, 3, 4 e 5;',
                'Ações: gG/gL - para uso gera e aR - ultrarrápido'
            ],
            pageLink: '#fusivel_nh'
        }
    ];
});
