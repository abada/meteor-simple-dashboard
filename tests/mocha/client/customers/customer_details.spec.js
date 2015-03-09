if (!(typeof MochaWeb === 'undefined')) {
  MochaWeb.testOnly(function () {

    describe('client', function () {
  		describe('customers', function () {
  			describe('customer_details', function () {

          describe('public', function () {

            before(function (done) {
              AuthHelper.logout(done);
    				});

            it(
              'should be redirected to the public welcome page if not logged in and try to access customer details',
              function () {
                Router.go('/customers/abc123');
                Tracker.flush();
                chai.expect($('.welcome-public').length).to.equal(1);
              }
            );

          });

          describe('secure', function () {

            before(function (done) {
              AuthHelper.login(done);
            });

            beforeEach(function () {
              this.customer = Collections.Customers.findOne();
              this.reload = _.bind(function () {
                Router.go('/customers/' + this.customer._id);
                Tracker.flush();
              }, this);
              this.reload();
            });

    				it(
    					'should show loaded customer details',
    					function () {
                chai.expect($('input[name="firstName"]').val())
                  .to.equal(this.customer.firstName);
    					}
    				);

            it(
    					'should initially set loaded customer details to be read-only',
              function () {
                chai.expect($('input[name="firstName"]').attr('readonly'))
                  .to.equal('readonly');
    					}
    				);

            it(
              'should show edit button when in read-only mode',
              function () {
                chai.expect($('.btn-edit').length).to.equal(1);
                chai.expect($('.btn-edit').is(':visible')).to.equal(true);
              }
            );

  					it(
  						'should set details to editable if edit button is clicked',
  						function () {
                $('.btn-edit').click();
                Tracker.flush();
                chai.expect($('input[name="firstName"]').attr('readonly'))
                  .to.not.equal('readonly');
  						}
  					);

  					it('should hide edit button if in editable mode', function () {
              $('.btn-edit').click();
              Tracker.flush();
              chai.expect($('.btn-edit').is(':hidden')).to.equal(true);
    				});

            it(
              'should show save and cancel buttons if in editable mode',
              function () {
                $('.btn-edit').click();
                Tracker.flush();
                chai.expect($('.btn-cancel').is(':visible')).to.equal(true);
                chai.expect($('.btn-save').is(':visible')).to.equal(true);
              }
            );

  					it(
  						'should save customer details when save button is clicked, showing new customer details in read-only form',
  						function () {
                var $firstNameEl, name;
                $firstNameEl = $('input[name="firstName"]');
                name = Fake.word();
                $('.btn-edit').click();
                Tracker.flush();
                $firstNameEl.val(name);
                $('.btn-save').click();
                this.reload();
                chai.expect($firstNameEl.val()).to.equal(name);
  						}
  					);

            it(
              'should cancel save putting form back in read-only mode when the cancel button is clicked',
              function () {
                var $firstNameEl = $('input[name="firstName"]');
                $('.btn-edit').click();
                Tracker.flush();
                chai.expect($firstNameEl.attr('readonly'))
                  .to.not.equal('readonly');
                $('.btn-cancel').click();
                setTimeout(function () {
                  chai.expect($firstNameEl.attr('readonly'))
                    .to.not.equal('readonly');
                });
              }
            );

            it(
              'should hide save and cancel buttons when in read-only mode',
              function () {
                chai.expect($('.btn-cancel').is(':hidden')).to.equal(true);
                chai.expect($('.btn-save').is(':hidden')).to.equal(true);
              }
            );

            it('should show appropriate validation errors', function () {
              var $firstNameEl = $('input[name="firstName"]');
              $('.btn-edit').click();
              Tracker.flush();
              $firstNameEl.val('');
              $('.btn-save').click();
              Tracker.flush();
              chai.expect($('.help-block').html())
                .to.equal('First Name is required');
            });

          });

  			});
  		});
    });

  });
}
