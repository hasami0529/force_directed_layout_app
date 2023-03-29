export function red(paper, model) {

    model.attr('body', {
        fill: 'red'
    })
}

export function gray(paper, model) {

    model.attr('body', {
        fill: 'gray'
    })
}

export function green(paper, model) {

    model.attr('body', {
        fill: 'green'
    })
}

export function blue(paper, model) {

    model.attr('body', {
        fill: 'blue'
    })
}

export function white(paper, model) {

    model.attr('body', {
        fill: 'white'
    })
}

export function purple(paper, model) {

    model.attr('body', {
        fill: 'purple'
    })
}

export function redLinearGradient(paper, model) {
    model.attr('body/fill', {
        type: 'linearGradient',
        stops: [
            { offset: '0%', color: '#E67E22' },
            { offset: '20%', color: '#D35400' },
            { offset: '40%', color: '#E74C3C' },
            { offset: '60%', color: '#C0392B' },
            { offset: '80%', color: '#F39C12' }
        ]
    })
}

