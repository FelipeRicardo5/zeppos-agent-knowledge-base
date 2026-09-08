// Updating a widget after creation — documented nowhere upstream, and the
// commonest operation in a watch app.
Page({
  refresh(text, value) {
    text.setProperty(prop.MORE, {
      text: `value: ${value}`,
    });
  },
});
