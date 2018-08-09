/**
 * @fileOverview G6 Mapper Plugin base on d3 tech stack
 * d3-scale  https://github.com/d3/d3-scale
 * d3-legend https://github.com/susielu/d3-legend
 * @author shiwu.wyy@antfin.com
 */

const G6 = require('@antv/g6');
const Util = G6.Util;

const extractSubgraph = {
  extract(graph, type, step, focusNodes) {
    const reEdges = [];
    Util.each(focusNodes, fn => {
      if (type === 'in') {
        const inEdges = fn.getInEdges();
        Util.each(inEdges, ie => {
          reEdges.push(ie);
        });
      } else if (type === 'out') {
        const outEdges = fn.getOutEdges();
        Util.each(outEdges, oe => {
          reEdges.push(oe);
        });
      } else {
        const inEdges = fn.getInEdges();
        Util.each(inEdges, ie => {
          reEdges.push(ie);
        });
        const outEdges = fn.getOutEdges();
        Util.each(outEdges, oe => {
          reEdges.push(oe);
        });
      }
    });

    const reNodes = [];
    Util.each(focusNodes, fn => {
      reNodes.push(fn);
      Util.each(reEdges, e => {
        const source = e.getSource();
        const target = e.getTarget();
        if (source.id !== fn.id) reNodes.push(source);
        if (target.id !== fn.id) reNodes.push(target);
      });
    });

    return {
      reNodes,
      reEdges
    };
  }
};
Util.mix(Util, extractSubgraph);
