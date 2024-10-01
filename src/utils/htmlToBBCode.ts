import { Parser } from 'htmlparser2';
import { DomHandler, Element, Node, Text } from 'domhandler';

interface BBCodeMap {
  [key: string]: string | ((element: Element, convert: (nodes: Node[]) => string) => string);
}

const bbCodeMap: BBCodeMap = {
  'b': '[b]{content}[/b]',
  'strong': '[b]{content}[/b]',
  'i': '[i]{content}[/i]',
  'em': '[i]{content}[/i]',
  'u': '[u]{content}[/u]',
  'a': (element, convert) => {
    const href = element.attribs['href'] || '';
    const content = convert(element.children);
    return `[url=${href}]${content}[/url]`;
  },
  'img': (element) => {
    const src = element.attribs['src'] || '';
    return `[img]${src}[/img]`;
  },
  'p': '{content}\n',
  'br': '\n',
};

export function htmlToBBCode(html: string): string {
  const handler = new DomHandler();
  const parser = new Parser(handler);
  parser.write(html);
  parser.end();

  function convert(nodes: Node[]): string {
    return nodes
      .map(node => {
        if (node.type === 'text') {
          const textNode = node as Text;
          return textNode.data || '';
        } else if (node.type === 'tag' || node.type === 'script' || node.type === 'style') {
          const element = node as Element;
          const tagName = element.name.toLowerCase();
          const mapping = bbCodeMap[tagName];

          if (typeof mapping === 'string') {
            const content = convert(element.children);
            return mapping.replace('{content}', content);
          } else if (typeof mapping === 'function') {
            return mapping(element, convert);
          } else {
            // If there is no match, we convert the child elements
            return convert(element.children);
          }
        } else {
          // We ignore comments and other types of nodes
          return '';
        }
      })
      .join('');
  }

  const bbCode = convert(handler.dom);
  return bbCode.trim();
}
