// Crear una instancia de Trie
const trie = new Trie();
// Lista de palabras reservadas de varios lenguajes de programación
const dictionary = [
    // Palabras reservadas de Pythona
    "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class",
    "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global",
    "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass", "raise", "return",
    "try", "while", "with", "yield",
    
    // Palabras reservadas de JavaScript
    "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char",
    "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else",
    "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function",
    "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long",
    "native", "new", "null", "package", "private", "protected", "public", "return", "short",
    "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", "true",
    "try", "typeof", "var", "void", "volatile", "while", "with", "yield",

    // Palabras reservadas de Java
    "abstract", "assert", "boolean", "break", "byte", "case", "catch", "char", "class",
    "const", "continue", "default", "do", "double", "else", "enum", "extends", "final",
    "finally", "float", "for", "goto", "if", "implements", "import", "instanceof", "int",
    "interface", "long", "native", "new", "null", "package", "private", "protected", "public",
    "return", "short", "static", "strictfp", "super", "switch", "synchronized", "this", "throw",
    "throws", "transient", "try", "void", "volatile", "while",

    // Palabras reservadas de C++
    "alignas", "alignof", "and", "and_eq", "asm", "atomic_cancel", "atomic_commit", "atomic_noexcept",
    "auto", "bitand", "bitor", "bool", "break", "case", "catch", "char", "char8_t", "char16_t",
    "char32_t", "class", "compl", "concept", "const", "consteval", "constexpr", "constinit", "const_cast",
    "continue", "co_await", "co_return", "co_yield", "decltype", "default", "delete", "do", "double",
    "dynamic_cast", "else", "enum", "explicit", "export", "extern", "false", "float", "for", "friend",
    "goto", "if", "inline", "int", "long", "mutable", "namespace", "new", "noexcept", "not", "not_eq",
    "nullptr", "operator", "or", "or_eq", "private", "protected", "public", "reflexpr", "register",
    "reinterpret_cast", "requires", "return", "short", "signed", "sizeof", "static", "static_assert",
    "static_cast", "struct", "switch", "synchronized", "template", "this", "thread_local", "throw",
    "true", "try", "typedef", "typeid", "typename", "union", "unsigned", "using", "virtual", "void",
    "volatile", "wchar_t", "while", "xor", "xor_eq"
];

// Insertar cada palabra del diccionario en el Trie
dictionary.forEach(word => trie.insert(word));

// Obtener referencias a los elementos del DOM
const searchBox = document.getElementById('searchBox');
const suggestionsContainer = document.getElementById('suggestions');
let currentSelection = -1; // Inicializar la selección actual

// Manejar el evento de entrada del usuario en el campo de búsqueda
searchBox.addEventListener('input', () => {
    const query = searchBox.value;
    const suggestions = trie.search(query);
    renderSuggestions(suggestions);
    currentSelection = -1; // Resetear la selección al cambiar el texto
});

// Manejar los eventos de teclado en el campo de búsqueda
searchBox.addEventListener('keydown', (e) => {
    const suggestions = Array.from(suggestionsContainer.children);
    if (e.key === 'ArrowDown') {
        // Mover la selección hacia abajo
        if (currentSelection < suggestions.length - 1) {
            currentSelection++;
            updateSelection(suggestions);
        }
    } else if (e.key === 'ArrowUp') {
        // Mover la selección hacia arriba
        if (currentSelection > 0) {
            currentSelection--;
            updateSelection(suggestions);
        }
    } else if (e.key === 'Enter') {
        // Seleccionar la sugerencia actual
        if (currentSelection >= 0) {
            searchBox.value = suggestions[currentSelection].textContent;
            suggestionsContainer.innerHTML = '';
        }
    }
});

// Función para actualizar la selección en la lista de sugerencias
function updateSelection(suggestions) {
    suggestions.forEach((suggestion, index) => {
        if (index === currentSelection) {
            suggestion.classList.add('selected');
            // Asegurarse de que la sugerencia seleccionada sea visible
            suggestion.scrollIntoView({
                block: 'nearest',
                inline: 'nearest'
            });
        } else {
            suggestion.classList.remove('selected');
        }
    });
}

// Función para renderizar las sugerencias en el contenedor
function renderSuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.className = 'suggestion';
        div.textContent = suggestion;
        div.addEventListener('click', () => {
            searchBox.value = suggestion;
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(div);
    });
}