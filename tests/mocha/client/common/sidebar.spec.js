if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {

    describe('client', function () {
  		describe('common', function () {
  			describe('sidebar', function () {

  				afterEach(function (done) {
            AuthHelper.logout(done);
  				});

  				it('should show welcome link if not logged in', function () {
  					chai.expect($('.sb-welcome').length).to.equal(1);
  				});

  				it('should only show welcome link if not logged in', function () {
  					chai.expect($('.sidebar li').length).to.equal(1);
  				});

  				it('should show admin links if logged in', function (done) {
            AuthHelper.login(done, function () {
              chai.expect($('.sidebar li').length).to.equal(3);
            });
  				});

          it(
            'should set proper sidebar link as active based on current page',
            function (done) {
              AuthHelper.login(done, function () {

                Router.go('/');
      					Tracker.flush();
                chai.expect($('.sb-welcome.active').length).to.equal(1);

                Router.go('/welcome');
      					Tracker.flush();
                chai.expect($('.sb-welcome.active').length).to.equal(1);

                Router.go('/customers');
                Tracker.flush();
                chai.expect($('.sb-customers.active').length).to.equal(1);

                Router.go('/export');
                Tracker.flush();
                chai.expect($('.sb-export.active').length).to.equal(1);

              });
            }
          );

  			});
  		});
    });

  });
}
