const queryParams = new URLSearchParams(location.search);
let lang = queryParams.has('en') ? 'en' : '';
let groupBy = 'of';
const filters = [];
const THANKS = [
    ["JnxF"], ["CntKillMe"]
];
const funcsById = new Map();

const TRANSLATE_TEXTS = {
    'no-desc-': 'Sin descripción todavía.',
    'no-desc-en': 'No description yet.',
    'no-class-': "Sin clase",
    'no-class-en': "No class",
    "group-by-": "Agrupar por:",
    "group-by-en": "Group by:",
    "gb-class-": "clase",
    "gb-class-en": "class",
    "gb-return-": "tipo de retorno",
    "gb-return-en": "return type",
    "search-": "Filtrar por nombre...",
    "search-en": "Filter by name...",
    "related-": "Relacionado:",
    "related-en": "Related:",
    "documented-": "Documentado:",
    "documented-en": "Documented: ",
    "not-for-seqs-": "Inútil en secuencias del editor de mapas.",
    "not-for-seqs-en": "Useless for sequences in the map editor.",
    "research-notes-": "Investigación requerida, notas:",
    "research-notes-en": "Research required, research notes:",
    "unknown-param-": "ignoto",
    "unknown-param-en": "unknown",
    "shortkeys-": "Atajos de teclado",
    "shortkeys-en": "Keyboard shortcuts",
    "thanks-": "Gracias por la ayuda a: ",
    "thanks-en": "Thanks for the help to: ",
    "item-only-": "Útil únicamente en programación de ítems.",
    "item-only-en": "Useful only for item scripting."
}

function renderType(type, isPtr, classes) {
    return `<a href="#${classes[type].name}" class="type ${classes[type].name}">${classes[type].name}${isPtr ? '<span class="ptr">*</span>' : ''}</a>`;
}

function addReturn(func, classes) {
    return `<wbr><span class="return"><span class="two_dots">:&nbsp;</span>${renderType(func.returns, func.returns_ptr, classes)}</span>`;
}

function renderParam(param, classes) {
    return `<wbr><span class="param"><span class="name">${
        param.name !== "number" ? escapeHtmlAndNameCorrection(param['name_' + lang] || param.name) : TRANSLATE_TEXTS['unknown-param-' + lang]
    }</span><span class="two_dots mid">:</span>${renderType(param.type, param.is_ptr, classes)}</span>`
}

function renderRelated(inFunction, relatedList) {
    if (!relatedList || relatedList.length === 0) return '';
    return `<div class="related">${TRANSLATE_TEXTS['related-' + lang]} ${relatedList.map(elementId => {
        const element = funcsById.get(elementId);
        if (!element) {
            console.warn(`Unknown related function in "${inFunction.id}": "${elementId}".`);
            return `[unknown ${elementId}]`;
        }
        const of = element.of ? THE_OBJ.classes[element.of].name + "::" : '';
        if (element.type === 'operator') {
            const param0 = element.params.length === 2
                ? typeForIdentifier(element.params[0].type, element.params[0].is_ptr, THE_OBJ.classes) + ' '
                : '';
            const param1idx = element.params.length === 2 ? 1 : 0;
            const param1 = typeForIdentifier(element.params[param1idx].type, element.params[param1idx].is_ptr, THE_OBJ.classes);
            return `<a href="#${elementId}">${param0}${escapeHtmlAndNameCorrection(element.name)} ${param1}</a>`;
        } else {
            const params = element.type === 'method' ? `(${element.params.map(
                p => typeForIdentifier(p.type, p.is_ptr, THE_OBJ.classes)
            ).join(", ")})` : '';
            return `<a href="#${elementId}">${of}${escapeHtmlAndNameCorrection(element.name)}${params}</a>`;
        }
    }).join(', ')}</div>`;
}

function renderNotForSequences(func) {
    if (func.notForSequences) {
        return `<div class="context-req"><span>${TRANSLATE_TEXTS["not-for-seqs-" + lang]}</span><span class="material-icons">description</span></div>`;
    } else return '';
}

function renderItemOnly(func) {
    if (func.itemScriptOnly) {
        return `<div class="context-req"><span>${TRANSLATE_TEXTS["item-only-" + lang]}</span><span class="material-icons">catching_pokemon</span></div>`;
    } else return '';
}

function renderResearchNotes(func) {
    if (func["research_needed_" + lang] || func.research_needed) {
        return `<div class='research-notes'><div class='research-notes-title'><span>${TRANSLATE_TEXTS["research-notes-" + lang]}</span><span class="material-icons">biotech</span></div><div class="research-notes-content">${func["research_needed_" + lang] || func.research_needed}</div></div>`;
    } else return '';
}

function renderDescription(func) {
    return `${renderNotForSequences(func)}${renderItemOnly(func)}<div class="description">${renderDangerousWarn(func)}${func['description_' + lang] || func.description
    || `<span class=\"to-fill\">${TRANSLATE_TEXTS['no-desc-' + lang]}</span>`}${renderResearchNotes(func)}</div>${renderRelated(func, func.related)}`;
}

function typeForIdentifier(type, isPtr, classes) {
    return `${isPtr ? 'ptr.' : ''}${classes[type].name}`;
}

function correctNameForIdentifier(name) {
    return name
        .replace(/-/g, '-m-')
        .replace(/\+/g, '-p-')
        .replace(/=/g, '-e-')
        .replace(/\*/g, '-a-')
        .replace(/!/g, '-x-')
        .replace(/\^/g, '-h-')
        .replace(/\[/g, '-c-')
        .replace(/\|/g, '-b-')
        .replace(/\//g, '-s-')
        .replace(/\\/g, '-bs-');
}

function uniqueIdentifierForFunc(func, classes) {
    return (func.of ? `${typeForIdentifier(func.of, func.of_ptr, classes)}::` : '')
        + correctNameForIdentifier(func.name)
        + (func.params.length > 0
            ? ':' + func.params.map(p => typeForIdentifier(p.type, p.is_ptr, classes)).join('_')
            : '');
}

function renderLinkThis(func, classes) {
    const params = new URLSearchParams(queryParams);
    params.delete('s'); // without search
    let paramsStr = params.toString();
    if (paramsStr) paramsStr = `?${paramsStr}`;
    return `<a class="linkThis" href="${paramsStr}#${func.id}"><span class="material-icons">link</span></a>`;
}

/**
 * @param {MouseEvent} event
 */
function clickedLinkThis(event) {
    event.preventDefault();
    event.stopPropagation();
    /**@var {string} url */
    const url = event.currentTarget.href;
    history.replaceState({}, document.title, event.currentTarget.href);
    const id = url.slice(url.indexOf('#') + 1);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({behavior: "smooth"});
    return false;
}

function dangerousClass(func) {
    return func.dangerous ? 'dangerous' : (
        func.very_dangerous ? 'very-dangerous' : ''
    );
}

function dangerousIcon(func, forDangerousToo = false) {
    return func.dangerous
        ? (forDangerousToo
                ? '<span class="material-icons">warning</span>'
                : ''
        )
        : (func.very_dangerous
                ? '<span class="material-icons">error</span>'
                : ''
        );
}

function renderDangerousWarn(func) {
    if (!func.dangerous) return '';
    return `<div class="dangerous-warn">${dangerousIcon(func, true)} ${func.dangerous[lang === '' ? 'es' : lang]}</div>`;
}

function renderFunction(func, classes) {
    switch (func.type) {
        case 'operator':
            if (func.params.length === 2) {
                const param0 = func.params[0];
                const param1 = func.params[1];
                return `<div class="binary operator ${dangerousClass(func)}" id="${func.id}">
                            <span class="name">
                                ${dangerousIcon(func)}
                                ${renderType(param0.type, param0.is_ptr, classes)}
                                <span class="op">${escapeHtmlAndNameCorrection(func.name)}</span>
                                ${renderType(param1.type, param1.is_ptr, classes)}
                                ${addReturn(func, classes)}
                            </span>
                            ${renderDescription(func)}
                            ${renderLinkThis(func, classes)}
                        </div>`.replace(/\n\s*/g, '');
            } else {
                const param0 = func.params[0];
                return `<div class="unary operator ${dangerousClass(func)}" id="${func.id}">
                            <span class="name">
                                ${dangerousIcon(func)}
                                <span class="op">${escapeHtmlAndNameCorrection(func.name)}</span>
                                ${renderType(param0.type, param0.is_ptr, classes)}
                                ${addReturn(func, classes)}
                            </span>
                            ${renderDescription(func)}
                            ${renderLinkThis(func, classes)}
                        </div>`.replace(/\n\s*/g, '');
            }
        case 'property':
            return `<div class="property ${dangerousClass(func)}" id="${func.id}">
                        <span class="name">
                            ${dangerousIcon(func)}
                            ${renderType(func.of, func.of_ptr, classes)}
                            <span class="in">::</span>
                            <span class="prop">${escapeHtmlAndNameCorrection(func.name)}</span>
                            ${addReturn(func, classes)}
                        </span>
                        ${renderDescription(func)}
                        ${renderLinkThis(func, classes)}
                    </div>`.replace(/\n\s*/g, '')
        case 'method':
            if (func.of != null) {
                return `<div class="method ${dangerousClass(func)}" id="${func.id}">
                            <span class="name">
                                ${dangerousIcon(func)}
                                ${renderType(func.of, func.of_ptr, classes)}
                                <span class="in">::</span>
                                <span class="meth">${escapeHtmlAndNameCorrection(func.name)}</span>
                                <span class="par open">(</span>
                                ${func.params.map(p => renderParam(p, classes)).join('<span class="sep">,<wbr></span>')}
                                <span class="par close">)</span>
                                ${addReturn(func, classes)}
                            </span>
                            ${renderDescription(func)}
                            ${renderLinkThis(func, classes)}
                        </div>`.replace(/\n\s*/g, '')
            } else {
                return `<div class="method ${dangerousClass(func)}" id="${func.id}">
                            <span class="name">
                                ${dangerousIcon(func)}
                                <span class="meth">${escapeHtmlAndNameCorrection(func.name)}</span>
                                <span class="par open">(</span>
                                ${func.params.map(p => renderParam(p, classes)).join('<span class="sep">,<wbr></span>')}
                                <span class="par close">)</span>
                                ${addReturn(func, classes)}
                            </span>
                            ${renderDescription(func)}
                            ${renderLinkThis(func, classes)}
                        </div>`.replace(/\n\s*/g, '')
            }
    }
}

const TYPES_ORDER = {
    'operator': 1,
    'property': 0,
    'method': 2
};

const TRANSLATE_TYPES = {
    'operator-': 'Operadores',
    'operator-en': 'Operators',
    'property-': 'Propiedades',
    'property-en': 'Properties',
    'method-': 'Métodos',
    'method-en': 'Methods'
};

function sortFuncs() {
    THE_OBJ.funcs.sort((a, b) => {
        if (a[groupBy] === b[groupBy]) {
            if (a.type === b.type) {
                if (a.of === b.of) {
                    return a.name.localeCompare(b.name);
                } else if (a.of === null) {
                    return 1;
                } else if (b.of === null) {
                    return -1;
                } else {
                    return a.of - b.of;
                }
            } else return TYPES_ORDER[a.type] - TYPES_ORDER[b.type];
        } else if (a[groupBy] === null) return 1;
        else if (b[groupBy] === null) return -1;
        else return a[groupBy] - b[groupBy];
    });
}

function addTooltip(event) {
    const link = event.target;
    const reference = link.getAttribute('href').slice(1);
    const referred = THE_OBJ.funcs.find(f => f.id === reference)
        || THE_OBJ.classes.find(c => c.name === reference)
        || null;
    if (referred) {
        const html = referred["description_" + lang] || referred.description
            || TRANSLATE_TEXTS["no-desc-" + lang];
        const elem = document.createElement("div");
        elem.innerHTML = html;
        let text = elem.innerText;
        if (text.length > 100) {
            text = text.slice(0, 100);
            const indexNL = text.indexOf('\n');
            const indexDot = text.indexOf('.') + 1;
            index = indexDot > 0 ? indexDot : indexNL;
            const ellip = index > 0 && text[index - 1] === '.' ? ' [&hellip;]' : '&hellip;'
            text = `${index >= 0 ? text.slice(0, index) : text}${ellip}`;
        }
        if (!link.innerText.includes(referred.name)) {
            let name;
            if (referred.type === 'operator') {
                const param0 = referred.params.length === 2
                    ? typeForIdentifier(referred.params[0].type, referred.params[0].is_ptr, THE_OBJ.classes) + ' '
                    : '';
                const param1idx = referred.params.length === 2 ? 1 : 0;
                const param1 = typeForIdentifier(
                    referred.params[param1idx].type,
                    referred.params[param1idx].is_ptr,
                    THE_OBJ.classes);
                name = `${param0}${escapeHtmlAndNameCorrection(referred.name)}${param1}`;
            } else {
                const of = referred.of ? THE_OBJ.classes[referred.of].name + "::" : '';
                const params = referred.type === 'method' ? `(${referred.params.map(
                    p => typeForIdentifier(p.type, p.is_ptr, THE_OBJ.classes)
                ).join(", ")})` : '';
                name = `${of}${escapeHtmlAndNameCorrection(referred.name)}${params}`;
            }
            text = `<i>${name}:</i> ${text}`;
        }
        text = `${dangerousIcon(referred, true)} ${text}`;
        link.innerHTML += `<span class="tooltiptext ${dangerousClass(referred)}">${text}</span>`;
    }
    link.removeEventListener('pointerenter', addTooltip);
}

function renderDetails([type, functions]) {
    return `<details class="class" ${type !== null ? `id="${type.name}"` : ""} open>
    <summary><h2>${type?.name || TRANSLATE_TEXTS['no-class-' + lang]}</h2></summary>
    <p>${
        type?.['description_' + lang] || type?.description
        || `<span class="to-fill">${TRANSLATE_TEXTS['no-desc-' + lang]}</span>`
    }</p>
    ${['property', 'operator', 'method']
        .map(funcType => [funcType, functions.filter(f => f.type === funcType)])
        .filter(([_, typeFs]) => typeFs.length > 0)
        .map(([type, typeFs]) =>
            `<h3>${TRANSLATE_TYPES[type + '-' + lang]}</h3>${
                typeFs.map(f => renderFunction(f, THE_OBJ.classes)).join("")}`)
    }
</details>`;
}

async function render() {
    const t0 = performance.now();

    const filterEmpty =
        filters.length > 0
            ? ([_, list]) => list.length > 0
            : () => true;
    // We add "null" at the end so non-methods are not missing
    const functionArrays = THE_OBJ.classes
        .concat([null])
        .map((type, typeIdx) => [
            type,
            THE_OBJ.funcs.filter(func =>
                func[groupBy] === type || func[groupBy] === typeIdx  // group by each type (and null)
                && filters.reduce((p, c) => p && c(func), true)      // apply filters
            )
        ]).filter(filterEmpty); // Do not print empty groups when there are filters
    if (filters.length === 0)
        functionArrays.sort((a, b) =>
            a[1].length === 0 ? 1 : (b[1].length === 0 ? -1 : 0)
        ); // move empty ones to the end

    const details = functionArrays.map(renderDetails);
    const main = document.getElementById('main');
    main.innerHTML = "";
    for (let i = 0; i < details.length; ++i) {
        main.insertAdjacentHTML('beforeend', details[i]);
        if (i === 3 || i % 15 === 14)
            await new Promise(r => setTimeout(r, 10));
    }

    for (const link of main.querySelectorAll('a[href^="#"]:not(.linkThis)')) {
        link.addEventListener('pointerenter', addTooltip);
    }
    main.querySelectorAll('a.linkThis').forEach(l => l.addEventListener('click', clickedLinkThis));
    main.querySelectorAll('pre')
        .forEach(pre => Prism.highlightElement(pre));
    main.querySelectorAll('tt.language-cks')
        .forEach(tt => Prism.highlightElement(tt));
    const t1 = performance.now();
    console.log("Rendered in", (t1 - t0), "ms.");
}

function nameFilter(text) {
    const start = text.startsWith("^");
    const end = text.endsWith("$");
    const lower = text.slice(start ? 1 : 0, end ? text.length - 1 : text.length).toLocaleLowerCase();
    if (start && end) {
        return func => func.name.toLocaleLowerCase() === lower;
    } else if (start) {
        return func => func.name.toLocaleLowerCase().startsWith(lower);
    } else if (end) {
        return func => func.name.toLocaleLowerCase().endsWith(lower)
    } else {
        return func => func.name.toLocaleLowerCase().includes(lower);
    }
}

function filterToIds() {
    return THE_OBJ.funcs.filter(func => filters.reduce((p, c) => p && c(func), true)).map(f => f.id);
}

function isElementVisible(el, topBias = 100) {
    const {top: elemTop, bottom: elemBottom} = el.getBoundingClientRect();
    return elemTop < window.innerHeight && elemBottom >= topBias;
}

function getCurrentlyVisibleIdx(elems) {
    for (let i = 0; i < elems.length; i++) {
        const el = elems.item(i);
        if (isElementVisible(el)) {
            return i;
        }
    }
    return -1;
}

/**
 * Replaces the state in the history updating the queryParams
 */
function replaceHistoryState() {
    history.replaceState({}, document.title, `?${queryParams.toString()}${location.hash}`);
}

/**
 * @param elems
 * @param {'up'|'down'} upOrDown
 * @param {boolean} loop
 */
function next(elems, upOrDown, loop = false) {
    let other = 0;
    const current = getCurrentlyVisibleIdx(elems);
    if (current > -1) {
        other = upOrDown === 'up' ? current - 1 : current + 1;
        if (other < 0 || other >= elems.length) {
            if (loop) {
                other = (other + elems.length) % elems.length;
            } else {
                return;
            }
        }
    }
    elems[other].scrollIntoView({block: "start", behavior: "smooth"});
}

const moveDetails = (upOrDown) => next(
    document.querySelectorAll('details:not(.shortkeys)'), upOrDown);
const moveFunc = (upOrDown) => next(
    document.querySelectorAll('div.operator,div.method,div.property'), upOrDown);
const nextResearchNote = () => next(document.querySelectorAll('div.research-notes'), 'down', true);

/**
 * @param {boolean} all
 * @param {'expand'|'collapse'|null} expansion
 */
function toggleDetailsExp(all, expansion = null) {
    const freeToggle = expansion === null;
    const shouldOpen = expansion === 'expand';
    /** @type {HTMLCollectionOf<HTMLDetailsElement>} */
    const details = document.querySelectorAll('details:not(.shortkeys)');
    if (all) {
        for (const elem of details) {
            elem.open = freeToggle ? !elem.open : shouldOpen;
        }
    } else {
        let curr = getCurrentlyVisibleIdx(details);
        if (curr < 0) return;
        while (!freeToggle && details[curr].open === shouldOpen) {
            curr++;
            if (curr >= details.length || !isElementVisible(details[curr])) {
                return;
            }
        }
        details[curr].open = freeToggle ? !details[curr].open : shouldOpen;
    }
}

function renderShortkey(shortkey, useAlt, description) {
    return `<div class='shortkey'>
<span class="keys">
    <span class='key'>Shift</span> +
${useAlt ? '    <span class="key">Alt</span> +' : ''}
    <span class='key'>${shortkey.display}</span>
    </span>
    <span class="shortkey-desc">${description[lang || 'es']}</span>
</div>`;
}


window.onload = function () {
    const lang_select = document.getElementById('lang_select');
    const groupByLabel = document.getElementById('group-by-label');
    const groupBySelect = document.getElementById('group-by-select');
    /** @type {HTMLInputElement} */
    const searchInput = document.getElementById('search');
    const documented = document.getElementById('documented');
    const thanks = document.getElementById('thanks');
    const shortkeysSum = document.getElementById('shortkeys-summary');
    const shortkeysCont = document.getElementById('shortkeys-content');
    let searchTimeout; // To debounce search

    function updateSelectText() {
        groupByLabel.innerText = TRANSLATE_TEXTS['group-by-' + lang];
        groupBySelect.options.item(0).innerText = TRANSLATE_TEXTS['gb-class-' + lang];
        groupBySelect.options.item(1).innerText = TRANSLATE_TEXTS['gb-return-' + lang];
        searchInput.setAttribute('placeholder', TRANSLATE_TEXTS['search-' + lang]);
    }

    function updateTranslatable() {
        document.querySelectorAll('.translate')
            .forEach(elem => {
                const text = elem.getAttribute(`data-${lang !== '' ? lang : 'es'}`);
                if (text) elem.innerText = text;
            });
        document.querySelectorAll('.link-translate')
            .forEach(elem => {
                if (!elem.href) return;
                let originalLink = elem.getAttribute('data-href');
                if (!originalLink) {
                    originalLink = elem.href;
                    elem.setAttribute('data-href', originalLink);
                }
                elem.href = `${originalLink}${lang !== '' ? `?${lang}` : ""}`;
            });
    }

    function updateDocumented() {
        const nDocumented = THE_OBJ.funcs.filter(f => 'description' in f).length
            + THE_OBJ.funcs.filter(f => 'description_en' in f).length;
        const nTotal = 2 * THE_OBJ.funcs.length;
        documented.innerHTML = `${TRANSLATE_TEXTS['documented-' + lang]} ${Math.round(nDocumented / nTotal * 100)}% (${Math.floor(nDocumented / 2)})`;
    }

    function updateThanks() {
        thanks.innerHTML = `${TRANSLATE_TEXTS['thanks-' + lang]}${THANKS.map(([n, l]) => l ? `<a href="${l}">${n}</a>` : n).join(", ")}.`;
    }

    const SHORT_KEYS = {
        'KeyF': {
            display: 'F',
            describe: {
                'es': 'Seleccionar el cuadro de filtrar por nombre',
                'en': 'Select the name-filtering input field'
            },
            do: () => {
                searchInput.focus();
                searchInput.setSelectionRange(0, searchInput.value.length);
            }
        },
        'KeyR': {
            display: 'R',
            describe: {
                'es': 'Agrupar por tipo de retorno',
                'en': 'Group by return type'
            },
            do: () => {
                groupBySelect.value = 'returns';
                groupBySelect.dispatchEvent(new Event('change'));
            }
        },
        'KeyC': {
            display: 'C',
            describe: {
                'es': 'Agrupar por clase',
                'en': 'Group by class'
            },
            do: () => {
                groupBySelect.value = 'of';
                groupBySelect.dispatchEvent(new Event('change'));
            }
        },
        'PageUp': {
            display: 'Pag<span class="material-icons">keyboard_arrow_up</span>',
            describe: {
                'es': 'Grupo previo',
                'en': 'Previous group'
            },
            do: () => moveDetails('up')
        },
        'PageDown': {
            display: 'Pag<span class="material-icons">keyboard_arrow_down</span>',
            describe: {
                'es': 'Siguiente grupo',
                'en': 'Next group'
            },
            do: () => moveDetails('down')
        },
        'ArrowUp': {
            display: '<span class="material-icons">keyboard_arrow_up</span>',
            describe: {
                'es': 'Función siguiente',
                'en': 'Next function'
            },
            do: () => moveFunc('up')
        },
        'ArrowDown': {
            display: '<span class="material-icons">keyboard_arrow_down</span>',
            describe: {
                'es': 'Función previa',
                'en': 'Previous function'
            },
            do: () => moveFunc('down')
        },
        'KeyN': {
            display: 'N',
            describe: {
                'es': 'Siguiente "investigación requerida" (cíclico)',
                'en': 'Next "required research" (cyclic)'
            },
            do: () => nextResearchNote()
        },
        'NumpadAdd': 'BracketRight',
        'BracketRight': {
            display: '+',
            describe: {
                'es': 'Expandir grupo',
                'en': 'Expand group'
            },
            withAlt: {
                'es': 'Expandir todo',
                'en': 'Expand all'
            },
            do: event => toggleDetailsExp(event.altKey, 'expand')
        },
        'NumpadSubtract': 'Slash',
        'Slash': {
            display: '-',
            describe: {
                'es': 'Colapsar grupo',
                'en': 'Collapse group'
            },
            withAlt: {
                'es': 'Colapsar todo',
                'en': 'Collapse all'
            },
            do: event => toggleDetailsExp(event.altKey, 'collapse')
        },
        'KeyU': {
            display: 'U',
            describe: {es: 'Solo no documentados', en: 'Undocumented only'},
            do: () => {
                searchInput.value = '';
                filters.splice(0, filters.length, func => !func[`description${lang ? '_' + lang : ''}`]);
                render();
            }
        }
    };
    document.addEventListener('keyup', event => {
        if (event.shiftKey) {
            let shortKey = SHORT_KEYS[event.code];
            while ((typeof shortKey) === 'string') {
                shortKey = SHORT_KEYS[shortKey];
            }
            if (shortKey && 'do' in shortKey) {
                shortKey.do(event);
                event.stopPropagation();
                event.preventDefault();
            }
        }
    });

    function updateShortkeys() {
        shortkeysSum.innerHTML = TRANSLATE_TEXTS['shortkeys-' + lang];
        shortkeysCont.innerHTML = Object.values(SHORT_KEYS)
            .filter(sk => (typeof sk) === 'object')
            .map(sk =>
                renderShortkey(sk, false, sk.describe)
                + (sk.withAlt ? renderShortkey(sk, true, sk.withAlt) : '')
            ).join('');
    }

    lang_select.value = lang;
    lang_select.addEventListener('change', () => {
        if (lang === 'en') {
            queryParams.delete('en');
        } else {
            queryParams.set('en', '1');
        }
        replaceHistoryState();
        lang = lang_select.value;
        updateSelectText();
        updateDocumented();
        updateTranslatable();
        updateShortkeys();
        updateThanks();
        render();
    });
    groupBySelect.addEventListener('change', () => {
        groupBy = groupBySelect.value;
        sortFuncs();
        render();
    });
    // search
    if (queryParams.has('s')) {
        let search = queryParams.getAll('s')
            .map(s => s.trim()).filter(s => s && s !== "^" && s !== "$");
        if (search && search.length > 0) {
            searchInput.value = search.join(" ");
            filters.splice(0, filters.length, ...search.map(s => nameFilter(s)));
        }
    }
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            if (searchInput.value) {
                const vals = searchInput.value.split(" ")
                    .map(s => s.trim()).filter(s => s && s !== "^" && s !== "$");
                queryParams.delete('s');
                vals.forEach(s => queryParams.append('s', s));
                filters.splice(0, filters.length, ...vals.map(s => nameFilter(s)));
            } else {
                queryParams.delete('s');
                filters.splice(0, filters.length);
            }
            replaceHistoryState();
            render();
        }, 300);
    });
    searchInput.addEventListener('keyup', event => {
        event.stopPropagation();
        if (event.code === 'Escape') searchInput.blur();
    });

    THE_OBJ.funcs.forEach(f => {
        funcsById.set(f.id, f);
    });

    setupPrism();

    updateSelectText();
    updateDocumented();
    updateTranslatable();
    updateShortkeys();
    updateThanks();
    sortFuncs();
    render().then(() => {
        // For links with hash to work after first render
        if (location.hash) {
            const elem = document.getElementById(location.hash.slice(1));
            if (elem) {
                setTimeout(elem.scrollIntoView.bind(elem));
                const main = document.getElementById('main');
                main.classList.add("one-remarked");
                elem.classList.add("remark");
                setTimeout(() => {
                    main.classList.remove("one-remarked");
                    elem.classList.remove("remark");
                }, 4100);
            }
        }
    });
}
