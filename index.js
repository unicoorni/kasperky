// document.getElementById('loadBtn').addEventListener('click', function () {

//     const fileInput = document.createElement('input')
//     fileInput.type = 'file'
//     fileInput.accept = 'text/csv'

//     fileInput.addEventListener('change', function (e) {
//         const file = e.target.files[0]
//         const reader = new FileReader()
//         reader.readAsText(file, 'UTF-8')

//         reader.onload = function (e) {
//             const contents = e.target.result

//             const lines = contents.split('\n')
//             const table = document.getElementById('table')

//             table.innerHTML = ''

//             for (let i = 0; i < lines.length; i++) {
//                 const phrases = lines[i].split(';')
//                 const row = document.createElement('tr')

//                 for (let j = 0; j < phrases.length; j++) {
//                     const cell = document.createElement('td')
//                     const phrase = phrases[j].trim()
//                     const words = phrase.split(' ')
//                     console.log(words)
//                     for (let k = 0; k < words.length; k++) {
//                         const word = words[k]

//                         const span = document.createElement('span')
//                         span.textContent = word + ' '
//                         span.addEventListener('click', function () {
//                             if (this.classList.contains('selected')) {
//                                 this.classList.remove('selected')
//                             } else {
//                                 this.classList.add('selected')
//                             }
//                         })

//                         cell.appendChild(span)
//                     }

//                     row.appendChild(cell)
//                 }

//                 table.appendChild(row)
//             }
//         }

//         // reader.readAsText(file, 'UTF-8')
//         const saveBtn = document.querySelector('.saveBtn')
//         saveBtn.classList.remove('hidden')
//     })

//     fileInput.click()
// })

// saveBtn.addEventListener('click', function () {
//     const rows = document.querySelectorAll('#table tr')
//     let selectedPhrases = []

//     for (let i = 0; i < rows.length; i++) {
//         const cells = rows[i].querySelectorAll('td')
//         let selectedCellText = []

//         for (let j = 0; j < cells.length; j++) {
//             const spans = cells[j].querySelectorAll('span')
//             let selectedWordText = []

//             for (let k = 0; k < spans.length; k++) {
//                 if (spans[k].classList.contains('selected')) {
//                     selectedWordText.push(spans[k].textContent.trim())
//                 }
//             }

//             if (selectedWordText.length > 0) {
//                 selectedCellText.push(selectedWordText.join('|'))
//             }
//         }

//         if (selectedCellText.length > 0) {
//             selectedPhrases.push(selectedCellText.join('|'))
//         }
//     }

//     let blob = new Blob([selectedPhrases.join('|')], { type: 'text/plain' })
//     const link = document.createElement('a')
//     link.href = URL.createObjectURL(blob)
//     link.download = 'selected_phrases.txt'
//     link.click()
// })

document.getElementById('loadBtn').addEventListener('click', function () {
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = 'text/csv'

    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = function (e) {
            const contents = e.target.result

            const lines = contents.split('\n') 
            const table = document.getElementById('table')

            table.innerHTML = ''

            const headerRow = document.createElement('tr')
            const idHeader = document.createElement('th')
            idHeader.classList.add('id')
            const textHeader = document.createElement('th')
            textHeader.classList.add('textHeader')

            idHeader.textContent = 'ID'
            textHeader.textContent = 'Text'
            headerRow.appendChild(idHeader)
            headerRow.appendChild(textHeader)
            table.appendChild(headerRow)

            for (let i = 0; i < lines.length; i++) {
                const phrases = lines[i].split(';') 
                
                const row = document.createElement('tr')

                const idCell = document.createElement('td')
                const textCell = document.createElement('td')
                idCell.textContent = i + 1
                

                const words = phrases[0].split(' ')
                words.forEach((word) => {
                    const span = document.createElement('span')
                    span.textContent = word + ' '
                    span.addEventListener('click', function () {
                        if (this.classList.contains('selected')) {
                            this.classList.remove('selected')
                        } else {
                            this.classList.add('selected')
                        }
                    })
                    textCell.appendChild(span)
                })

                row.appendChild(idCell)
                row.appendChild(textCell)
                table.appendChild(row)
            }
        }

        reader.readAsText(file, 'UTF-8')
        const saveBtn = document.querySelector('.saveBtn')
        saveBtn.classList.remove('hidden')
    })

    fileInput.click()
})

saveBtn.addEventListener('click', function () {
    const rows = document.querySelectorAll('#table tr')
    let selectedPhrases = []

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll('td')
        let selectedCellText = []

        for (let j = 0; j < cells.length; j++) {
            const spans = cells[j].querySelectorAll('span')
            let selectedWordText = []

            for (let k = 0; k < spans.length; k++) {
                if (spans[k].classList.contains('selected')) {
                    selectedWordText.push(spans[k].textContent.trim())
                }
            }

            if (selectedWordText.length > 0) {
                selectedCellText.push(selectedWordText.join('|'))
            }
        }

        if (selectedCellText.length > 0) {
            selectedPhrases.push(selectedCellText.join('|'))
        }
    }

    let blob = new Blob([selectedPhrases.join('|')], { type: 'text/plain' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'selected_phrases.txt'
    link.click()
})
