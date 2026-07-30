// Name: Lambda
// ID: ddeLambda
// Description: Functional programming and lambda expressions for NitroBolt.
// By: ddededodediamante <https://github.com/ddededodediamante/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class Lambda {
    getInfo() {
      return {
        id: "ddeLambda",
        name: Scratch.translate("Lambda"),
        color1: "#7B52AE",
        blocks: [
          {
            opcode: "runLambda",
            text: Scratch.translate("run lambda [LAMBDA] with [ARG]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              LAMBDA: { type: Scratch.ArgumentType.OBJECT },
              ARG: { type: Scratch.ArgumentType.STRING, defaultValue: "item" },
            },
          },
          {
            opcode: "createLambda",
            text: Scratch.translate("lambda [ARG]"),
            blockType: Scratch.BlockType.OBJECT,
            branchCount: 1,
            arguments: {
              ARG: { type: Scratch.ArgumentType.STRING, defaultValue: "x" },
            },
          },
          {
            opcode: "mapList",
            text: Scratch.translate("map [LIST] using [LAMBDA]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, defaultValue: "list" },
              LAMBDA: { type: Scratch.ArgumentType.OBJECT },
            },
          },
          {
            opcode: "filterList",
            text: Scratch.translate("filter [LIST] using [LAMBDA]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, defaultValue: "list" },
              LAMBDA: { type: Scratch.ArgumentType.OBJECT },
            },
          },
        ],
      };
    }

    createLambda(args, util) {
      return {
        type: "lambda",
        argName: Scratch.Cast.toString(args.ARG),
        branch: util.branch1,
      };
    }

    runLambda(args, util) {
      const lambda = args.LAMBDA;
      if (!lambda || typeof lambda !== "object" || lambda.type !== "lambda") {
        return "";
      }

      const thread = util.thread;
      const substackBranch = lambda.branch;
      
      if (!substackBranch) return "";

      // Push execution context for the substack branch
      util.startBranch(1, true);
      return thread.topBlock;
    }

    mapList(args, util) {
      const listName = Scratch.Cast.toString(args.LIST);
      const listObj = util.target.lookupList(listName);
      if (!listObj) return "[]";

      const lambda = args.LAMBDA;
      if (!lambda || typeof lambda !== "object" || lambda.type !== "lambda") {
        return "[]";
      }

      const results = [];
      const globalValues = listObj.value;

      for (let i = 0; i < globalValues.length; i++) {
        const item = globalValues[i];
        results.push(item);
      }

      return JSON.stringify(results);
    }

    filterList(args, util) {
      const listName = Scratch.Cast.toString(args.LIST);
      const listObj = util.target.lookupList(listName);
      if (!listObj) return "[]";

      const lambda = args.LAMBDA;
      if (!lambda || typeof lambda !== "object" || lambda.type !== "lambda") {
        return "[]";
      }

      const results = [];
      const globalValues = listObj.value;

      for (let i = 0; i < globalValues.length; i++) {
        const item = globalValues[i];
        results.push(item);
      }

      return JSON.stringify(results);
    }
  }

  Scratch.extensions.register(new Lambda());
})(Scratch);

