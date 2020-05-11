import { primary, greyscales, negativeReds, white } from './Colors';

const DefaultState = {
  normal: {
    borderColor: greyscales[500],
    backgroundColor: white,
    fontColor: greyscales[900],
    actionBorderColor: null,
    actionBackColor: null
  },
  hovered: {
    borderColor: greyscales[500],
    backgroundColor: white,
    fontColor: greyscales[900],
    actionBorderColor: greyscales[900],
    actionBackColor: null
  },
  pressed: {
    borderColor: greyscales[500],
    backgroundColor: white,
    fontColor: greyscales[900],
    actionBorderColor: greyscales[900],
    actionBackColor: greyscales[100]
  },
  disabled: {
    borderColor: greyscales[300],
    backgroundColor: white,
    fontColor: greyscales[300],
    actionBorderColor: null,
    actionBackColor: null
  }
};

const SecondaryState = {
  normal: {
    borderColor: primary[500],
    backgroundColor: white,
    fontColor: primary[500],
    actionBorderColor: null,
    actionBackColor: null
  },
  hovered: {
    borderColor: primary[500],
    backgroundColor: white,
    fontColor: primary[500],
    actionBorderColor: null,
    actionBackColor: primary[100]
  },
  pressed: {
    borderColor: primary[500],
    backgroundColor: white,
    fontColor: primary[500],
    actionBorderColor: null,
    actionBackColor: primary[200]
  },
  disabled: {
    borderColor: primary[300],
    backgroundColor: primary[100],
    fontColor: primary[300],
    actionBorderColor: null,
    actionBackColor: null
  }
};

const PrimaryState = {
  normal: {
    borderColor: null,
    backgroundColor: primary[500],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: null
  },
  hovered: {
    borderColor: null,
    backgroundColor: primary[500],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: primary[600]
  },
  pressed: {
    borderColor: null,
    backgroundColor: primary[500],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: primary[700]
  },
  disabled: {
    borderColor: null,
    backgroundColor: primary[200],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: null
  },
  loading: {
    borderColor: null,
    backgroundColor: primary[500],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: null
  }
};

const OnDarkState = {
  normal: {
    borderColor: null,
    backgroundColor: white,
    fontColor: primary[500],
    actionBorderColor: null,
    actionBackColor: null
  },
  hovered: {
    borderColor: null,
    backgroundColor: white,
    fontColor: primary[500],
    actionBorderColor: null,
    actionBackColor: primary[100]
  },
  pressed: {
    borderColor: null,
    backgroundColor: white,
    fontColor: primary[500],
    actionBorderColor: null,
    actionBackColor: primary[200]
  },
  disabled: {
    borderColor: null,
    backgroundColor: white,
    fontColor: primary[300],
    actionBorderColor: null,
    actionBackColor: null
  }
};

const DangerState = {
  normal: {
    borderColor: null,
    backgroundColor: negativeReds[100],
    fontColor: negativeReds[500],
    actionBorderColor: null,
    actionBackColor: null
  },
  hovered: {
    borderColor: null,
    backgroundColor: negativeReds[100],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: negativeReds[500]
  },
  pressed: {
    borderColor: null,
    backgroundColor: negativeReds[500],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: negativeReds[700]
  },
  disabled: {
    borderColor: null,
    backgroundColor: negativeReds[200],
    fontColor: white,
    actionBorderColor: null,
    actionBackColor: null
  }
};

export { DefaultState, SecondaryState, PrimaryState, OnDarkState, DangerState };
