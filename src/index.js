import ToolboxIcon from './svg/toolbox.svg';
import './index.css';

/**
 * Numbering Tool for the Editor.js
 */
export default class Numbering {
  /**
   * @param data
   * @param config
   * @param api
   */
  constructor({ data, config, api }) {
    this.api = api;

    this.nodes = {
      wrapper: null,
      text: null,
      number: null
    };

    this.config = {
      numberPlaceholder: config.numberPlaceholder || 'Номер',
      textPlaceholder: config.textPlaceholder || 'Текст'
    };

    this.data = data;
  }

  /**
   * @returns {{icon: *, title: string}}
   */
  static get toolbox() {
    return {
      icon: ToolboxIcon,
      title: 'Нумерация'
    };
  }

  /**
   * Tool's CSS classes
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,
      loader: this.api.styles.loader,

      /**
       * Tool's classes
       */
      wrapper: 'cdx-numbering',
      text: 'cdx-numbering__text',
      number: 'cdx-numbering__number'
    };
  }

  /**
   * @param toolsContent
   * @returns {*}
   */
  save(toolsContent) {
    const text = (this.nodes.text.innerHTML || '').trim();
    const number = (this.nodes.number.innerHTML || '').trim();

    Object.assign(this.data, {
      text,
      number
    });

    return this.data;
  }

  /**
   * @returns {null}
   */
  render() {
    const { text, number } = this.data;

    this.nodes.wrapper = this.make('div', [this.CSS.baseClass, this.CSS.wrapper]);

    // Text
    this.nodes.text = this.make('div', [this.CSS.input, this.CSS.text], {
      contentEditable: true,
      innerHTML: text || ''
    });

    this.nodes.text.dataset.placeholder = this.config.textPlaceholder;

    // Number
    this.nodes.number = this.make('div', [this.CSS.input, this.CSS.number], {
      contentEditable: true,
      innerHTML: number || ''
    });

    this.nodes.number.dataset.placeholder = this.config.numberPlaceholder;

    this.nodes.wrapper.appendChild(this.nodes.number);
    this.nodes.wrapper.appendChild(this.nodes.text);

    return this.nodes.wrapper;
  }

  /**
   * @param savedData
   * @returns {boolean}
   */
  validate(savedData) {
    return savedData.text.trim() !== '';
  }

  /**
   * Helper method for elements creation
   * @param tagName
   * @param classNames
   * @param attributes
   * @return {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
