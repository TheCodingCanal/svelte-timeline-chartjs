export const data = {
    labels: ['Ankermake', 'Ender', 'Prusa', 'MakerBot'],
    datasets: [
        {
            label: 'Weekly Sales',
            data: [
                {
                    x: ['2022-10-02', '2022-10-08'],
                    y: 'Ender',
                    label: 'Job 1234 - Part A 500 total count 98% efficient     300 good count',
                    tooltip: `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                },
                {
                    x: ['2022-10-08', '2022-10-10'],
                    y: 'Ender',
                    label: 'Job 1235',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-01', '2022-10-05'],
                    y: 'Ankermake',
                    label: 'Job 1236\nThis is a new line of text that is really long. I like writing test sentences. One more sentence should do it.',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-05', '2022-10-12'],
                    y: 'Ankermake',
                    label: 'Job 1237\nThis is a new line of text that is really long. I like writing test sentences. One more sentence should do it.',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-05', '2022-10-12'],
                    y: 'MakerBot',
                    label: 'Job 1237',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                }
            ],
            backgroundColor: [
                'rgba(255, 134,159,0.4)',
                'rgba(98,  182, 239,0.4)',
                'rgba(255, 218, 128,0.4)',
                'rgba(113, 205, 205,0.4)',
                'rgba(170, 128, 252,0.4)',
                'rgba(255, 177, 101,0.4)'
            ],
            borderWidth: 1,
            borderSkipped: false,
            borderColor: [
                'rgba(255, 134, 159, 1)',
                'rgba(98,  182, 239, 1)',
                'rgba(255, 218, 128, 1)',
                'rgba(113, 205, 205, 1)',
                'rgba(170, 128, 252, 1)',
                'rgba(255, 177, 101, 1)'
            ]
        },
        {
            label: 'Weekly Sales',
            data: [
                {
                    x: ['2022-10-02', '2022-10-08'],
                    y: 'Ender',
                    label: ['Job 1234 - Part A', '500 total count', '98% efficient     300 good count'],
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-08', '2022-10-10'],
                    y: 'Ender',
                    label: 'Job 1235',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-01', '2022-10-05'],
                    y: 'Ankermake',
                    label: 'Job 1236',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-05', '2022-10-12'],
                    y: 'Ankermake',
                    label: 'Job 1237',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-05', '2022-10-12'],
                    y: 'MakerBot',
                    label: 'Job 1237',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                },
                {
                    x: ['2022-10-12', '2022-10-15'],
                    y: 'MakerBot',
                    label: 'Job 1237',
                    tooltip: [
                        `<style>tr:nth-child(even) {
							background-color: gray;
						}
						tr:nth-child(odd) {
						 	background-color: darkgray;
						}
						</style>
						<table style='background-color: black'>
						  <tr>
						    <th>Company</th>
						    <th>Contact</th>
						    <th>Country</th>
						  </tr>
						  <tr>
						    <td>Alfreds Futterkiste</td>
						    <td>Maria Anders</td>
						    <td>Germany</td>
						  </tr>
						  <tr>
						    <td>Centro comercial Moctezuma</td>
						    <td>Francisco Chang</td>
						    <td>Mexico</td>
						  </tr>
						</table>`
                    ]
                }
            ],
            backgroundColor: [
                'rgba(255, 134,159,0.4)',
                'rgba(98,  182, 239,0.4)',
                'rgba(255, 218, 128,0.4)',
                'rgba(113, 205, 205,0.4)',
                'rgba(170, 128, 252,0.4)',
                'rgba(255, 177, 101,0.4)'
            ],
            borderWidth: 1,
            borderSkipped: false,
            borderColor: [
                'rgba(255, 134, 159, 1)',
                'rgba(98,  182, 239, 1)',
                'rgba(255, 218, 128, 1)',
                'rgba(113, 205, 205, 1)',
                'rgba(170, 128, 252, 1)',
                'rgba(255, 177, 101, 1)'
            ]
        }
    ]
};
